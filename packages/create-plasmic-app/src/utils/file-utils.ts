import { existsSync, promises as fs, unlinkSync } from "fs";
import glob from "glob";
import L from "lodash";
import * as path from "upath";
import { GATSBY_404 } from "../gatsby/template";
import { README } from "../templates/readme";
import { WELCOME_PAGE } from "../templates/welcomePage";
import { JsOrTs, PlatformType } from "../utils/types";
import { ensure, ensureString } from "./lang-utils";
import { installUpgrade } from "./npm-utils";

/**
 * Runs the search pattern through `glob` and deletes all resulting files
 * @param searchPattern - glob search query
 * @param skipPatterns - array of fragments. Skip any file contains any of the fragments
 */
export function deleteGlob(
  searchPattern: string,
  skipPatterns?: string[]
): void {
  const filesToDelete = glob
    .sync(searchPattern)
    .filter(
      (file) =>
        !skipPatterns || !skipPatterns.find((pattern) => file.includes(pattern))
    );
  filesToDelete.forEach((f: string) => unlinkSync(f));
}

export function stripExtension(
  filename: string,
  removeComposedPath = false
): string {
  const ext = removeComposedPath
    ? filename.substring(filename.indexOf("."))
    : path.extname(filename);
  if (!ext || filename === ext) {
    return filename;
  }
  return filename.substring(0, filename.lastIndexOf(ext));
}

export async function writePlasmicLoaderJson(
  projectDir: string,
  projectId: string,
  projectApiToken: string
): Promise<void> {
  const plasmicLoaderJson = path.join(projectDir, "plasmic-loader.json");
  const content = {
    projects: [
      {
        projectId,
        projectApiToken,
      },
    ],
  };
  await fs.writeFile(plasmicLoaderJson, JSON.stringify(content));
}

/**
 * - [nextjs|gatsby, loader, '/' page exists] - remove index file
 * - [nextjs|gatsby, loader, '/' Page DNE] - replace index file with Welcome page
 * - [nextjs|gatsby, codegen, '/' page exists] - remove Next.js/Gatsby index file, preserve Plasmic index
 * - [nextjs|gatsby, codegen, '/' page DNE] - replace index file with Welcome page
 * - [react, codegen ]  - replace App file with '/', Home, or Welcome page
 * @returns
 */
export async function overwriteIndex(
  projectPath: string,
  platform: string,
  scheme: string
): Promise<void> {
  const isNextjs = platform === "nextjs";
  const isGatsby = platform === "gatsby";
  const isCra = platform === "react";

  const config = await getPlasmicConfig(projectPath, platform, scheme);
  const plasmicFiles = L.map(
    L.flatMap(config.projects, (p) => p.components),
    (c) => c.importSpec.modulePath
  );

  const isTypescript = config?.code?.lang === "ts";
  const pagesDir = ensure(
    isNextjs
      ? path.join(projectPath, "pages/")
      : isGatsby
      ? path.join(projectPath, "src/pages/")
      : isCra
      ? path.join(projectPath, "src/")
      : undefined
  );
  const indexBasename = isCra ? `App` : `index`;
  const extension = isTypescript ? "tsx" : "jsx";
  const indexAbsPath = path.join(pagesDir, `${indexBasename}.${extension}`);

  // Delete existing index files
  // - Skipping any Plasmic-managed files
  // - Note: this only compares basenames, so it may have false positives
  deleteGlob(
    path.join(pagesDir, `${indexBasename}.*`),
    plasmicFiles.map((f) => path.basename(f))
  );

  // Special case: remove all Gatsby components (due to conflicting file names)
  // TODO: find a better way to handle this issue
  if (platform === "gatsby") {
    // Delete the index file
    deleteGlob(path.join(projectPath, "src/@(pages|components)/*.*"), [
      // Files to ignore
      ...plasmicFiles.map((f) => path.basename(f)),
    ]);
    // Create a very basic 404 page - `gatsby build` fails without it.
    // We've deleted the components that the default 404 page depended
    // on, so
    await fs.writeFile(path.join(projectPath, "src/pages/404.js"), GATSBY_404);
  }

  // We're done if we can already render an index page
  if (
    (isNextjs || isGatsby) &&
    plasmicFiles.find((f) => f.includes("/index."))
  ) {
    return;
  }

  const homeFilePossibilities = glob.sync(
    path.join(
      projectPath,
      ensureString(config.srcDir),
      "**",
      "@(index|Home|home|Homepage).*"
    )
  );
  const content =
    isCra && homeFilePossibilities.length > 0
      ? generateHomePage(homeFilePossibilities[0], indexAbsPath)
      : generateWelcomePage(config, platform);
  await fs.writeFile(indexAbsPath, content);
}

/**
 * Overwrite the README file
 * @param projectPath
 * @param platform
 * @param buildCommand
 */
export async function overwriteReadme(
  projectPath: string,
  platform: PlatformType,
  buildCommand: string
): Promise<void> {
  const readmeFile = path.join(projectPath, "README.md");
  const contents = README(platform, buildCommand);
  await fs.writeFile(readmeFile, contents);
}

/**
 * Generate a file to render the component
 * @param componentAbsPath - absolute path to component to render
 * @param indexAbsPath - absolute path of index file to write
 * @returns
 */
function generateHomePage(
  componentAbsPath: string,
  indexAbsPath: string
): string {
  const componentFilename = path.basename(componentAbsPath);
  const componentName = stripExtension(componentFilename);
  // The relative import path from App.js to the Plasmic component
  const componentRelativePath = path.relative(
    path.dirname(indexAbsPath),
    componentAbsPath
  );
  const appjsContents = `
import ${componentName} from './${stripExtension(componentRelativePath)}';

function App() {
  return (<${componentName} />);
}

export default App;
  `;
  return appjsContents;
}

/**
 * Generate a Welcome page based on a PlasmicConfig
 * @param config - PlasmicConfig
 * @param noPages - don't render links to pages
 * @returns
 */
function generateWelcomePage(config: any, platform: string): string {
  let hasPages = false;
  let pageComponents: any[];
  let pagesDir: string;
  if (platform !== "react" && config && L.isArray(config.projects)) {
    pageComponents = L.flatMap(config.projects, (p) => p.components).filter(
      (c) => c.componentType === "page"
    );
    pagesDir = config?.nextjsConfig?.pagesDir ?? config?.gatsbyConfig?.pagesDir;
    if (pageComponents.length > 0 && pagesDir) {
      hasPages = true;
    }
  }
  const getPageSection = () => {
    const pageLinks = pageComponents
      .map((pc) => {
        // Get the relative path on the filesystem
        const relativePath = path.relative(pagesDir, pc.importSpec.modulePath);
        // Format as an absolute path without the extension name
        const relativeLink = "/" + stripExtension(relativePath);
        if (platform === "nextjs") {
          return `<li><Link href="${relativeLink}"><a style={{ color: "blue" }}>${pc.name} - ${relativeLink}</a></Link></li>`;
        } else {
          return `<li><a style={{ color: "blue" }} href="${relativeLink}">${pc.name} - ${relativeLink}</a></li>`;
        }
      })
      .join("\n");
    return `
          <h3>Your pages:</h3>
          <ul>
            ${pageLinks}
          </ul>
    `;
  };

  const content = WELCOME_PAGE(
    hasPages,
    platform,
    hasPages ? getPageSection() : ""
  );
  return content;
}

async function getPlasmicConfig(
  projectPath: string,
  platform: string,
  scheme: string
) {
  const isNextjs = platform === "nextjs";
  const isGatsby = platform === "gatsby";
  const isLoader = scheme === "loader";
  const isCodegen = scheme === "codegen";
  const configPath = ensure(
    isCodegen
      ? "plasmic.json"
      : isNextjs && isLoader
      ? ".plasmic/plasmic.json"
      : isGatsby && isLoader
      ? ".cache/.plasmic/plasmic.json"
      : undefined
  );
  const configStr = await fs.readFile(path.join(projectPath, configPath));
  return JSON.parse(configStr.toString());
}

// Create tsconfig.json if it doesn't exist
// this will force Plasmic to recognize Typescript
export async function ensureTsconfig(projectPath: string): Promise<void> {
  const tsconfigPath = path.join(projectPath, "tsconfig.json");
  if (!existsSync(tsconfigPath)) {
    await fs.writeFile(tsconfigPath, "");
    const installTsResult = await installUpgrade("typescript @types/react", {
      workingDir: projectPath,
    });
    if (!installTsResult) {
      throw new Error("Failed to install Typescript");
    }
  }
}

export function ifTs(ts: JsOrTs, str: string) {
  return ts === "ts" ? str : "";
}
