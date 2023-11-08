import { ParamExportType } from "../../lang";
import { Bundler } from "../../shared/bundler";
import { convertVariableTypeToWabType } from "../../shared/core/model-util";
import { StateVariableType } from "../../states";
import {
  BundleMigrationType,
  unbundleSite,
} from "../db/bundle-migration-utils";
import { UnbundledMigrationFn } from "../db/BundleMigrator";

export const migrate: UnbundledMigrationFn = async (bundle, db, entity) => {
  const bundler = new Bundler();
  const { site, siteOrProjectDep } = await unbundleSite(
    bundler,
    bundle,
    db,
    entity
  );

  for (const component of site.components) {
    for (const state of component.states) {
      if (state.accessType === "writable") {
        state.param.exportType = ParamExportType.External;
      }
      state.param.type = convertVariableTypeToWabType(
        state.variableType as StateVariableType
      );
    }
  }

  const newBundle = bundler.bundle(
    siteOrProjectDep,
    entity.id,
    "83-specific-type-for-states"
  );
  Object.assign(bundle, newBundle);
};

export const MIGRATION_TYPE: BundleMigrationType = "unbundled";
