/// <reference types="@types/jest" />
import { getEnvVar, LOADER_NEXTJS_VERSIONS } from "../env";
import { runCypressTest } from "../test-utils";
import { NextJsContext, setupNextJs, teardownNextJs } from "./nextjs-setup";

describe.each(LOADER_NEXTJS_VERSIONS)(
  "Plasmic Antd5 loader-nextjs@$loaderVersion, next@$nextVersion",
  ({ loaderVersion, nextVersion }) => {
    let ctx: NextJsContext;
    beforeAll(async () => {
      ctx = await setupNextJs({
        bundleFile: "plasmic-antd5.json",
        projectName: "Antd project",
        npmRegistry: getEnvVar("NPM_CONFIG_REGISTRY"),
        codegenHost: getEnvVar("WAB_HOST"),
        removeComponentsPage: true,
        loaderVersion,
        nextVersion,
      });
    });
    afterAll(async () => {
      await teardownNextJs(ctx);
    });

    test("it works", async () => {
      await runCypressTest({
        name: `antd5-nextjs-loader@${loaderVersion}-next@${nextVersion}`,
        spec: "./cypress/e2e/plasmic-antd5.cy.ts",
        baseUrl: ctx.host,
      });
    });
  }
);
