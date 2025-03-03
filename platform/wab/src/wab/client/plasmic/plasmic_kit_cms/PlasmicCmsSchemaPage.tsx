// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: ieacQ3Z46z4gwo1FnaB5vY
// Component: y1ZiXuS8BD

import * as React from "react";

import {
  Flex as Flex__,
  SingleBooleanChoiceArg,
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  hasVariant,
  useDollarState,
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";

import CmsModelDetails from "../../components/cms/CmsModelDetails"; // plasmic-import: pLQf-lY112u/component
import CmsModelItem from "../../components/cms/CmsModelItem"; // plasmic-import: FpZFUfiTA6/component
import CmsModelsList from "../../components/cms/CmsModelsList"; // plasmic-import: M3aa84scyXT/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import sty from "./PlasmicCmsSchemaPage.module.css"; // plasmic-import: y1ZiXuS8BD/css
import projectcss from "./plasmic_plasmic_kit_cms.module.css"; // plasmic-import: ieacQ3Z46z4gwo1FnaB5vY/projectcss

createPlasmicElementProxy;

export type PlasmicCmsSchemaPage__VariantMembers = {
  noModels: "noModels";
};
export type PlasmicCmsSchemaPage__VariantsArgs = {
  noModels?: SingleBooleanChoiceArg<"noModels">;
};
type VariantPropType = keyof PlasmicCmsSchemaPage__VariantsArgs;
export const PlasmicCmsSchemaPage__VariantProps = new Array<VariantPropType>(
  "noModels"
);

export type PlasmicCmsSchemaPage__ArgsType = {};
type ArgPropType = keyof PlasmicCmsSchemaPage__ArgsType;
export const PlasmicCmsSchemaPage__ArgProps = new Array<ArgPropType>();

export type PlasmicCmsSchemaPage__OverridesType = {
  root?: Flex__<"div">;
  cmsModelsList?: Flex__<typeof CmsModelsList>;
  cmsModelDetails?: Flex__<typeof CmsModelDetails>;
};

export interface DefaultCmsSchemaPageProps {
  noModels?: SingleBooleanChoiceArg<"noModels">;
  className?: string;
}

const $$ = {};

function PlasmicCmsSchemaPage__RenderFunc(props: {
  variants: PlasmicCmsSchemaPage__VariantsArgs;
  args: PlasmicCmsSchemaPage__ArgsType;
  overrides: PlasmicCmsSchemaPage__OverridesType;
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
        path: "noModels",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.noModels,
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
      <CmsModelsList
        data-plasmic-name={"cmsModelsList"}
        data-plasmic-override={overrides.cmsModelsList}
        className={classNames("__wab_instance", sty.cmsModelsList, {
          [sty.cmsModelsListnoModels]: hasVariant(
            $state,
            "noModels",
            "noModels"
          ),
        })}
        isEmpty={hasVariant($state, "noModels", "noModels") ? true : undefined}
        isSchemaMode={true}
      >
        <CmsModelItem
          className={classNames("__wab_instance", sty.cmsModelItem__giYjr)}
          isActive={true}
        />

        <CmsModelItem
          className={classNames("__wab_instance", sty.cmsModelItem__n4VSd)}
        />
      </CmsModelsList>
      {(hasVariant($state, "noModels", "noModels") ? false : true) ? (
        <CmsModelDetails
          data-plasmic-name={"cmsModelDetails"}
          data-plasmic-override={overrides.cmsModelDetails}
          className={classNames("__wab_instance", sty.cmsModelDetails, {
            [sty.cmsModelDetailsnoModels]: hasVariant(
              $state,
              "noModels",
              "noModels"
            ),
          })}
        />
      ) : null}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "cmsModelsList", "cmsModelDetails"],
  cmsModelsList: ["cmsModelsList"],
  cmsModelDetails: ["cmsModelDetails"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  cmsModelsList: typeof CmsModelsList;
  cmsModelDetails: typeof CmsModelDetails;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicCmsSchemaPage__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicCmsSchemaPage__VariantsArgs;
    args?: PlasmicCmsSchemaPage__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicCmsSchemaPage__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicCmsSchemaPage__ArgsType,
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
          internalArgPropNames: PlasmicCmsSchemaPage__ArgProps,
          internalVariantPropNames: PlasmicCmsSchemaPage__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicCmsSchemaPage__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicCmsSchemaPage";
  } else {
    func.displayName = `PlasmicCmsSchemaPage.${nodeName}`;
  }
  return func;
}

export const PlasmicCmsSchemaPage = Object.assign(
  // Top-level PlasmicCmsSchemaPage renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    cmsModelsList: makeNodeComponent("cmsModelsList"),
    cmsModelDetails: makeNodeComponent("cmsModelDetails"),

    // Metadata about props expected for PlasmicCmsSchemaPage
    internalVariantProps: PlasmicCmsSchemaPage__VariantProps,
    internalArgProps: PlasmicCmsSchemaPage__ArgProps,
  }
);

export default PlasmicCmsSchemaPage;
/* prettier-ignore-end */
