// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: ieacQ3Z46z4gwo1FnaB5vY
// Component: FiuFB1wXjp

import * as React from "react";

import {
  Flex as Flex__,
  SingleChoiceArg,
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  hasVariant,
  useDollarState,
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";

import CmsContentPage from "../../components/cms/CmsContentPage"; // plasmic-import: fC6EeUMrpE/component
import CmsLeftTabs from "../../components/cms/CmsLeftTabs"; // plasmic-import: kX5_DA_mZR/component
import CmsSchemaPage from "../../components/cms/CmsSchemaPage"; // plasmic-import: y1ZiXuS8BD/component
import CmsSettingsPage from "../../components/cms/CmsSettingsPage"; // plasmic-import: a5viGetjMi/component
import CmsTopBar from "../../components/cms/CmsTopBar"; // plasmic-import: FxC1c7NZtR/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import sty from "./PlasmicCmsRoot.module.css"; // plasmic-import: FiuFB1wXjp/css
import projectcss from "./plasmic_plasmic_kit_cms.module.css"; // plasmic-import: ieacQ3Z46z4gwo1FnaB5vY/projectcss

createPlasmicElementProxy;

export type PlasmicCmsRoot__VariantMembers = {
  activeTab: "content" | "schema" | "settings";
};
export type PlasmicCmsRoot__VariantsArgs = {
  activeTab?: SingleChoiceArg<"content" | "schema" | "settings">;
};
type VariantPropType = keyof PlasmicCmsRoot__VariantsArgs;
export const PlasmicCmsRoot__VariantProps = new Array<VariantPropType>(
  "activeTab"
);

export type PlasmicCmsRoot__ArgsType = {};
type ArgPropType = keyof PlasmicCmsRoot__ArgsType;
export const PlasmicCmsRoot__ArgProps = new Array<ArgPropType>();

export type PlasmicCmsRoot__OverridesType = {
  root?: Flex__<"div">;
  cmsTopBar?: Flex__<typeof CmsTopBar>;
  freeBox?: Flex__<"div">;
  cmsLeftTabs?: Flex__<typeof CmsLeftTabs>;
  cmsContentPage?: Flex__<typeof CmsContentPage>;
  cmsSchemaPage?: Flex__<typeof CmsSchemaPage>;
  cmsSettingsPage?: Flex__<typeof CmsSettingsPage>;
};

export interface DefaultCmsRootProps {
  activeTab?: SingleChoiceArg<"content" | "schema" | "settings">;
  className?: string;
}

const $$ = {};

function PlasmicCmsRoot__RenderFunc(props: {
  variants: PlasmicCmsRoot__VariantsArgs;
  args: PlasmicCmsRoot__ArgsType;
  overrides: PlasmicCmsRoot__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {},
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );

  const $props = {
    ...args,
    ...variants,
  };

  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const stateSpecs: Parameters<typeof useDollarState>[0] = React.useMemo(
    () => [
      {
        path: "activeTab",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.activeTab,
      },
    ],

    [$props, $ctx, $refs]
  );
  const $state = useDollarState(stateSpecs, {
    $props,
    $ctx,
    $queries: {},
    $refs,
  });

  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root
      )}
    >
      <CmsTopBar
        data-plasmic-name={"cmsTopBar"}
        data-plasmic-override={overrides.cmsTopBar}
        className={classNames("__wab_instance", sty.cmsTopBar, {
          [sty.cmsTopBaractiveTab_content]: hasVariant(
            $state,
            "activeTab",
            "content"
          ),
          [sty.cmsTopBaractiveTab_schema]: hasVariant(
            $state,
            "activeTab",
            "schema"
          ),
        })}
      />

      <div
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        className={classNames(projectcss.all, sty.freeBox, {
          [sty.freeBoxactiveTab_content]: hasVariant(
            $state,
            "activeTab",
            "content"
          ),
          [sty.freeBoxactiveTab_schema]: hasVariant(
            $state,
            "activeTab",
            "schema"
          ),
          [sty.freeBoxactiveTab_settings]: hasVariant(
            $state,
            "activeTab",
            "settings"
          ),
        })}
      >
        <CmsLeftTabs
          data-plasmic-name={"cmsLeftTabs"}
          data-plasmic-override={overrides.cmsLeftTabs}
          activeTab={
            hasVariant($state, "activeTab", "settings")
              ? "settings"
              : hasVariant($state, "activeTab", "schema")
              ? "schema"
              : hasVariant($state, "activeTab", "content")
              ? "content"
              : undefined
          }
          className={classNames("__wab_instance", sty.cmsLeftTabs, {
            [sty.cmsLeftTabsactiveTab_content]: hasVariant(
              $state,
              "activeTab",
              "content"
            ),
            [sty.cmsLeftTabsactiveTab_schema]: hasVariant(
              $state,
              "activeTab",
              "schema"
            ),
            [sty.cmsLeftTabsactiveTab_settings]: hasVariant(
              $state,
              "activeTab",
              "settings"
            ),
          })}
        />

        {(hasVariant($state, "activeTab", "content") ? true : false) ? (
          <CmsContentPage
            data-plasmic-name={"cmsContentPage"}
            data-plasmic-override={overrides.cmsContentPage}
            className={classNames("__wab_instance", sty.cmsContentPage, {
              [sty.cmsContentPageactiveTab_content]: hasVariant(
                $state,
                "activeTab",
                "content"
              ),
            })}
          />
        ) : null}
        {(hasVariant($state, "activeTab", "schema") ? true : false) ? (
          <CmsSchemaPage
            data-plasmic-name={"cmsSchemaPage"}
            data-plasmic-override={overrides.cmsSchemaPage}
            className={classNames("__wab_instance", sty.cmsSchemaPage, {
              [sty.cmsSchemaPageactiveTab_schema]: hasVariant(
                $state,
                "activeTab",
                "schema"
              ),
            })}
          />
        ) : null}
        {(hasVariant($state, "activeTab", "settings") ? true : false) ? (
          <CmsSettingsPage
            data-plasmic-name={"cmsSettingsPage"}
            data-plasmic-override={overrides.cmsSettingsPage}
            className={classNames("__wab_instance", sty.cmsSettingsPage, {
              [sty.cmsSettingsPageactiveTab_settings]: hasVariant(
                $state,
                "activeTab",
                "settings"
              ),
            })}
          />
        ) : null}
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "cmsTopBar",
    "freeBox",
    "cmsLeftTabs",
    "cmsContentPage",
    "cmsSchemaPage",
    "cmsSettingsPage",
  ],

  cmsTopBar: ["cmsTopBar"],
  freeBox: [
    "freeBox",
    "cmsLeftTabs",
    "cmsContentPage",
    "cmsSchemaPage",
    "cmsSettingsPage",
  ],

  cmsLeftTabs: ["cmsLeftTabs"],
  cmsContentPage: ["cmsContentPage"],
  cmsSchemaPage: ["cmsSchemaPage"],
  cmsSettingsPage: ["cmsSettingsPage"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  cmsTopBar: typeof CmsTopBar;
  freeBox: "div";
  cmsLeftTabs: typeof CmsLeftTabs;
  cmsContentPage: typeof CmsContentPage;
  cmsSchemaPage: typeof CmsSchemaPage;
  cmsSettingsPage: typeof CmsSettingsPage;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicCmsRoot__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicCmsRoot__VariantsArgs;
    args?: PlasmicCmsRoot__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicCmsRoot__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicCmsRoot__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicCmsRoot__ArgProps,
          internalVariantPropNames: PlasmicCmsRoot__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicCmsRoot__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicCmsRoot";
  } else {
    func.displayName = `PlasmicCmsRoot.${nodeName}`;
  }
  return func;
}

export const PlasmicCmsRoot = Object.assign(
  // Top-level PlasmicCmsRoot renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    cmsTopBar: makeNodeComponent("cmsTopBar"),
    freeBox: makeNodeComponent("freeBox"),
    cmsLeftTabs: makeNodeComponent("cmsLeftTabs"),
    cmsContentPage: makeNodeComponent("cmsContentPage"),
    cmsSchemaPage: makeNodeComponent("cmsSchemaPage"),
    cmsSettingsPage: makeNodeComponent("cmsSettingsPage"),

    // Metadata about props expected for PlasmicCmsRoot
    internalVariantProps: PlasmicCmsRoot__VariantProps,
    internalArgProps: PlasmicCmsRoot__ArgProps,
  }
);

export default PlasmicCmsRoot;
/* prettier-ignore-end */
