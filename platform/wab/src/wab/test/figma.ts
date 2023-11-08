import fs from "fs";
import { map, split, uniq } from "lodash";
import path from "path";
import { Site } from "../classes";
import { ResizableImage } from "../client/dom-utils";
import { ImageAssetType } from "../image-asset-type";
import { TplMgr } from "../shared/TplMgr";
import { VariantTplMgr } from "../shared/VariantTplMgr";

export const createTplMgr = (site: Site) => new TplMgr({ site });

const emptyVariants = {
  getTargetVariants: () => [],
  getPinnedVariants: () => {},
};

export const createVariantTplMgr = (site: Site, tplMgr: TplMgr) => {
  return new VariantTplMgr(
    [
      {
        // @ts-ignore
        component: {
          name: "jest-root",
          variants: [],
        },
        ...emptyVariants,
      },
    ],
    site,
    tplMgr,
    emptyVariants
  );
};

export const createSiteOps = (tplMgr: TplMgr) => {
  return {
    createImageAsset: (
      img: ResizableImage,
      opts: { type?: ImageAssetType; name?: string }
    ) => {
      const dataUri = img.url;
      const type = opts.type!;
      const asset = tplMgr.addImageAsset({
        name: opts.name,
        type: type || ImageAssetType.Icon,
        dataUri,
        width: img.width,
        height: img.height,
        aspectRatio: img.scaledRoundedAspectRatio,
      });
      return {
        asset,
      };
    },
    renameImageAsset: (asset: any, name: string) => {
      tplMgr.renameImageAsset(asset, name);
    },
  };
};

export const createAppCtx = () => {
  return {};
};

export const FILES_PATH = path.join(
  __dirname,
  "..",
  "__tests__",
  "figma",
  "files"
);

export const getFigmaFilesIds = () => {
  const files = fs.readdirSync(FILES_PATH);
  return uniq(map(files, (file) => split(file, "-")[0]));
};

const getFilePath = (fileName) =>
  path.join(__dirname, "..", "__tests__", "figma", "files", fileName);

export const getTestFigmaData = (id) => {
  const figdataPath = getFilePath(`${id}-figdata.json`);
  const raw = fs.readFileSync(figdataPath);
  // @ts-ignore
  return JSON.parse(raw);
};
