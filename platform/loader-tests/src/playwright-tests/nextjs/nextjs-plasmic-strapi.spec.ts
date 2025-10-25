import { getEnvVar } from "../../env";
import { test } from "../../fixtures";
import {
  NextJsContext,
  setupNextJs,
  teardownNextJs,
} from "../../nextjs/nextjs-setup";
import { testStrapiLoader } from "./shared/test-strapi";

test.describe(`NextJS Plasmic Strapi`, () => {
  let ctx: NextJsContext;

  test.beforeAll(async () => {
    ctx = await setupNextJs({
      bundleFile: "plasmic-strapi.json",
      projectName: "Strapi Project",
      npmRegistry: getEnvVar("NPM_CONFIG_REGISTRY"),
      codegenHost: getEnvVar("WAB_HOST"),
      removeComponentsPage: true,
    });
  });

  test.afterAll(async () => {
    await teardownNextJs(ctx);
  });

  test(`should work with Strapi v4`, async ({ page }) => {
    await testStrapiLoader(page, ctx.host, 4);
  });

  test(`should work with Strapi v5`, async ({ page }) => {
    await testStrapiLoader(page, ctx.host, 5);
  });
});
