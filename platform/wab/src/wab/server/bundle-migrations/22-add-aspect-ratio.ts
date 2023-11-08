import S3 from "aws-sdk/clients/s3";
import { JSDOM } from "jsdom";
import { ensure } from "../../common";
import { ImageAssetType } from "../../image-asset-type";
import {
  asDataUrl,
  getParsedDataUrlData,
  parseDataUrl,
  SVG_MEDIA_TYPE,
} from "../../shared/data-urls";
import { processSvg } from "../../shared/svgo";
import { ASPECT_RATIO_SCALE_FACTOR } from "../../tpls";
import { BundleMigrationType } from "../db/bundle-migration-utils";
import { BundledMigrationFn } from "../db/BundleMigrator";

const siteAssetsBucket = process.env.SITE_ASSETS_BUCKET as string;

export const migrate: BundledMigrationFn = async (bundle) => {
  for (const inst of Object.values(bundle.map)) {
    if (inst.__type === "ImageAsset") {
      inst["aspectRatio"] = null;
      const url: string | null = inst["dataUri"];
      if (
        inst["type"] === ImageAssetType.Picture &&
        url &&
        url.startsWith("http") &&
        url.endsWith(".svg")
      ) {
        const storagePath = new URL(url).pathname.replace(/^\//, "");
        const res = await new S3()
          .getObject({
            Bucket: siteAssetsBucket,
            Key: storagePath,
          })
          .promise();
        const dataUrl = asDataUrl(
          Buffer.from(ensure(res.Body, "must exist") as string),
          ensure(res.ContentType, "must exist")
        );
        const parsed = parseDataUrl(dataUrl);
        if (parsed && parsed.mediaType === SVG_MEDIA_TYPE) {
          const aspectRatio = processSvg(
            getParsedDataUrlData(parsed),
            new new JSDOM().window.DOMParser()
          )?.aspectRatio;
          if (aspectRatio && isFinite(aspectRatio)) {
            inst["aspectRatio"] = Math.round(
              aspectRatio * ASPECT_RATIO_SCALE_FACTOR
            );
          }
        }
      }
    }
  }
};

export const MIGRATION_TYPE: BundleMigrationType = "bundled";
