import { isKnownCustomCode, VariantsRef, VarRef } from "../../classes";
import { ensureArray, withoutNils } from "../../common";
import { removeFromArray } from "../../commons/collections";
import { Bundler } from "../../shared/bundler";
import { findVariantSettingsUnderTpl } from "../../tpls";
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
    for (const [vs] of findVariantSettingsUnderTpl(component.tplTree)) {
      // @ts-ignore -- handlers was removed from VariantSetting
      if (vs.handlers) {
        // @ts-ignore -- handlers was removed from VariantSetting
        for (const handler of vs.handlers) {
          for (const interaction of handler.interactions) {
            if (
              ["setVariable", "toggleVariable"].includes(interaction.actionName)
            ) {
              const varArg = interaction.args.find(
                (a) => a.name === "variable"
              );
              if (varArg && isKnownCustomCode(varArg.expr)) {
                const varName = JSON.parse(varArg.expr.code);
                const variable = component.states.find(
                  (s) => s.param.variable.name === varName
                )?.param.variable;
                if (variable) {
                  varArg.expr = new VarRef({ variable });
                } else {
                  removeFromArray(interaction.args, varArg);
                }
              }
            }

            if (interaction.actionName === "setVariant") {
              const varArg = interaction.args.find((a) => a.name === "variant");
              const valueArg = interaction.args.find((a) => a.name === "value");

              if (varArg && isKnownCustomCode(varArg.expr)) {
                const varName = JSON.parse(varArg.expr.code);
                const variable = component.params.find(
                  (p) => p.variable.name === varName
                )?.variable;
                if (variable) {
                  varArg.name = "vgroup";
                  varArg.expr = new VarRef({ variable });
                } else {
                  removeFromArray(interaction.args, varArg);
                  if (valueArg) {
                    removeFromArray(interaction.args, valueArg);
                  }
                  continue;
                }
              }

              if (valueArg && isKnownCustomCode(valueArg.expr)) {
                const variantNames = ensureArray(
                  JSON.parse(valueArg.expr.code)
                );
                const variants = withoutNils(
                  variantNames.map((vname) =>
                    component.variants.find((v) => v.name === vname)
                  )
                );
                valueArg.expr = new VariantsRef({ variants });
              }
            }

            if (interaction.actionName === "toggleVariant") {
              const variantArg = interaction.args.find(
                (a) => a.name === "variant"
              );
              if (variantArg && isKnownCustomCode(variantArg.expr)) {
                const variantNames = ensureArray(
                  JSON.parse(variantArg.expr.code)
                );
                const variants = withoutNils(
                  variantNames.map((vname) =>
                    component.variants.find((v) => v.name === vname)
                  )
                );
                variantArg.expr = new VariantsRef({ variants });
              }
            }
          }
        }
      }
    }
  }

  const newBundle = bundler.bundle(
    siteOrProjectDep,
    entity.id,
    "85-interaction-args"
  );
  Object.assign(bundle, newBundle);
};

export const MIGRATION_TYPE: BundleMigrationType = "unbundled";
