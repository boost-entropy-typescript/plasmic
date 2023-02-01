import fs from "fs";
import path from "path";
import { spawnOrFail } from "../utils/cmd-utils";
import { installCodegenDeps, runCodegenSync } from "../utils/codegen";
import { overwriteIndex } from "../utils/file-utils";
import { installUpgrade } from "../utils/npm-utils";
import { CPAStrategy } from "../utils/strategy";

export const reactStrategy: CPAStrategy = {
  create: async (args) => {
    const { projectPath, jsOrTs } = args;
    let { template } = args;
    const createCommand = `npx create-react-app@latest ${projectPath}`;

    if (!template && jsOrTs === "ts") {
      template = "typescript";
    }

    const templateArg = template ? ` --template ${template}` : "";
    await spawnOrFail(`${createCommand}${templateArg}`);
  },
  installDeps: async ({ projectPath, scheme }) => {
    if (scheme === "loader") {
      return await installUpgrade("@plasmicapp/loader-react", {
        workingDir: projectPath,
      });
    } else {
      return await installCodegenDeps({ projectPath });
    }
  },
  overwriteConfig: async (args) => {
    // No config to overwrite
  },
  generateFiles: async ({
    scheme,
    projectApiToken,
    projectId,
    projectPath,
    jsOrTs,
  }) => {
    if (scheme === "loader") {
      // Nothing to do
    } else {
      await runCodegenSync({
        projectId,
        projectApiToken,
        projectPath,
      });

      // Overwrite the App.tsx
      await overwriteIndex(projectPath, "react", scheme);
    }

    // Deactivate React.StrictMode from index.js or index.tsx
    const indexFileName = path.join(
      projectPath,
      "src",
      `index.${jsOrTs === "js" ? "js" : "tsx"}`
    );
    let indexFile = fs.readFileSync(indexFileName).toString();
    indexFile = indexFile.replace("<React.StrictMode>", "");
    indexFile = indexFile.replace("</React.StrictMode>", "");
    fs.writeFileSync(indexFileName, indexFile);

    return;
  },
  build: async (args) => {
    const { npmRunCmd, projectPath } = args;
    await spawnOrFail(`${npmRunCmd} build`, projectPath);
  },
};
