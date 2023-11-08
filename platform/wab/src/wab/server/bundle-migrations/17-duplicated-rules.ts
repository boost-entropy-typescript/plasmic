import { ProjectDependency, Site } from "../../classes";
import { ensureInstance } from "../../common";
import { Bundler } from "../../shared/bundler";
import { BundleMigrationType } from "../db/bundle-migration-utils";
import { UnbundledMigrationFn } from "../db/BundleMigrator";
import { loadDepPackages } from "../db/DbBundleLoader";

export const migrate: UnbundledMigrationFn = async (bundle, db, entity) => {
  const rsIids: string[] = [];
  for (const [iid, json] of Object.entries(bundle.map)) {
    if (json.__type === "RuleSet") {
      rsIids.push(iid);
    }
  }

  const deps = await loadDepPackages(db, bundle);
  const bundler = new Bundler();

  deps.forEach((dep) => bundler.unbundle(JSON.parse(dep.model), dep.id));
  const siteOrProjectDep = ensureInstance(
    bundler.unbundle(bundle, entity.id),
    Site,
    ProjectDependency
  );

  // OBSOLETED by 183-
  // for (const iid of rsIids) {
  //   const rs = bundler.objByAddr({ iid, uuid: entity.id });
  //   if (rs) {
  //     assert(isKnownRuleSet(rs), "must be RuleSet");
  //     let deleted = false;
  //     const newChildren = rs.children.filter((rule, index) => {
  //       if (rule.name.startsWith("background-")) {
  //         console.log(`Found ${rule.name}; Deleting...`);
  //         deleted = true;
  //         return false;
  //       }
  //       // Finding based on `RuleSetHelpers._rule(prop)`:
  //       // `return this._rs.children.find((r) => r.name === prop);`
  //       if (rs.children.findIndex((r) => r.name === rule.name) !== index) {
  //         console.log(`Found duplicated rule ${rule.name}; Deleting...`);
  //         deleted = true;
  //         return false;
  //       }
  //       return true;
  //     });
  //     if (deleted) {
  //       console.log(
  //         `Before deleting: ${JSON.stringify(rs.children, undefined, 2)}`
  //       );
  //       rs.children = newChildren;
  //       console.log(
  //         `After deleting: ${JSON.stringify(rs.children, undefined, 2)}`
  //       );
  //     }
  //   }
  // }

  const newBundle = bundler.bundle(
    siteOrProjectDep,
    entity.id,
    "17-duplicated-rules"
  );
  Object.assign(bundle, newBundle);
};

export const MIGRATION_TYPE: BundleMigrationType = "unbundled";
