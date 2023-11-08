import { Popover } from "antd";
import classNames from "classnames";
import React from "react";
import { isKnownVariantedValue, StyleToken } from "../../../classes";
import { VariantedStylesHelper } from "../../../shared/VariantedStylesHelper";
import { BASE_VARIANT_NAME } from "../../../shared/Variants";
import { capitalizeFirst } from "../../../strs";
import TokenIcon from "../../plasmic/plasmic_kit/PlasmicIcon__Token";
import { StudioCtx } from "../../studio-ctx/StudioCtx";
import { Icon } from "../widgets/Icon";
import {
  getStylePropValue,
  SourceRow,
  variantComboName,
} from "./DefinedIndicator";
import styles from "./DefinedIndicator.module.sass";

export function TokenDefinedIndicator(props: {
  token: StyleToken;
  vsh?: VariantedStylesHelper;
  studioCtx: StudioCtx;
  className?: string;
}) {
  const {
    token,
    vsh = new VariantedStylesHelper(),
    studioCtx,
    className,
  } = props;

  const indicatorType = vsh.isStyleInherited(token) ? "otherVariants" : "set";
  const isEditingNonBaseVariant = !vsh.isTargetBaseVariant();

  return (
    <div className={className}>
      <Popover
        title={token.name}
        content={[
          { isBaseVariant: "true", value: token.value },
          ...vsh.sortedActiveVariantedValue(token),
        ].map((v, i, arr) => (
          <div className="defined-indicator__prop" key={i}>
            <div className="defined-indicator__source-stack">
              <div className="defined-indicator__source-stack__line-container">
                <div className="defined-indicator__source-stack__line-container__line" />
              </div>
              <SourceRow
                key={i}
                title={
                  isKnownVariantedValue(v)
                    ? variantComboName(v.variants)
                    : capitalizeFirst(BASE_VARIANT_NAME)
                }
                icon={<Icon icon={TokenIcon} />}
                type={i !== arr.length - 1 ? "overwritten" : "target"}
              >
                <div className="flex flex-vcenter">
                  {getStylePropValue(studioCtx.site, undefined, v.value, vsh)}
                </div>
              </SourceRow>
            </div>
          </div>
        ))}
      >
        <div className={styles.DefinedIndicatorContainerCentered}>
          <div
            className={classNames({
              [styles.DefinedIndicator]: true,
              [styles["DefinedIndicator--set"]]:
                indicatorType === "set" && !isEditingNonBaseVariant,
              [styles["DefinedIndicator--overriding"]]:
                indicatorType === "set" && isEditingNonBaseVariant,
              [styles["DefinedIndicator--inherited"]]:
                indicatorType === "otherVariants",
            })}
          />
        </div>
      </Popover>
    </div>
  );
}
