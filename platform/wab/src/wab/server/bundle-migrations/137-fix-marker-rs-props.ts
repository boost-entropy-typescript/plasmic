import { normProp } from "../../css";
import { BundleMigrationType } from "../db/bundle-migration-utils";
import { BundledMigrationFn } from "../db/BundleMigrator";

export const migrate: BundledMigrationFn = async (bundle) => {
  for (const inst of Object.values(bundle.map)) {
    if (inst.__type === "Rule") {
      if (RE_CAMELCASE_LIKE.test(inst.name)) {
        inst.name = normProp(inst.name);
      }
    }
  }
};

const RE_CAMELCASE_LIKE = /[a-z][A-Z]/g;

export const MIGRATION_TYPE: BundleMigrationType = "bundled";
