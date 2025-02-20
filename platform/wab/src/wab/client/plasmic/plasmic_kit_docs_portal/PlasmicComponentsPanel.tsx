// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: dyzP6dbCdycwJpqiR2zkwe
// Component: c-G65M7vor
import * as React from "react";

import * as p from "@plasmicapp/react-web";

import {
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
} from "@plasmicapp/react-web";
import ComponentListItem from "../../components/docs/ComponentListItem"; // plasmic-import: vY12pF45uf/component
import Searchbox from "../../components/widgets/Searchbox"; // plasmic-import: po7gr0PX4_gWo/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "./plasmic_plasmic_kit_docs_portal.module.css"; // plasmic-import: dyzP6dbCdycwJpqiR2zkwe/projectcss
import sty from "./PlasmicComponentsPanel.module.css"; // plasmic-import: c-G65M7vor/css

export type PlasmicComponentsPanel__VariantMembers = {};

export type PlasmicComponentsPanel__VariantsArgs = {};
type VariantPropType = keyof PlasmicComponentsPanel__VariantsArgs;
export const PlasmicComponentsPanel__VariantProps =
  new Array<VariantPropType>();

export type PlasmicComponentsPanel__ArgsType = {
  children?: React.ReactNode;
};

type ArgPropType = keyof PlasmicComponentsPanel__ArgsType;
export const PlasmicComponentsPanel__ArgProps = new Array<ArgPropType>(
  "children"
);

export type PlasmicComponentsPanel__OverridesType = {
  root?: p.Flex<"div">;
  searchContainer?: p.Flex<"div">;
  searchbox?: p.Flex<typeof Searchbox>;
  componentsContainer?: p.Flex<"div">;
};

export interface DefaultComponentsPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const defaultComponentsPanel__Args: Partial<PlasmicComponentsPanel__ArgsType> =
  {};

function PlasmicComponentsPanel__RenderFunc(props: {
  variants: PlasmicComponentsPanel__VariantsArgs;
  args: PlasmicComponentsPanel__ArgsType;
  overrides: PlasmicComponentsPanel__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;
  const args = Object.assign({}, defaultComponentsPanel__Args, props.args);
  const $props = args;

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
      <div
        data-plasmic-name={"searchContainer"}
        data-plasmic-override={overrides.searchContainer}
        className={classNames(projectcss.all, sty.searchContainer)}
      >
        <Searchbox
          data-plasmic-name={"searchbox"}
          data-plasmic-override={overrides.searchbox}
          className={classNames("__wab_instance", sty.searchbox)}
        />
      </div>

      <div
        data-plasmic-name={"componentsContainer"}
        data-plasmic-override={overrides.componentsContainer}
        className={classNames(projectcss.all, sty.componentsContainer)}
      >
        {p.renderPlasmicSlot({
          defaultContents: (
            <React.Fragment>
              <ComponentListItem
                className={classNames(
                  "__wab_instance",
                  sty.componentListItem__tmJC
                )}
              >
                {"Button"}
              </ComponentListItem>

              <ComponentListItem
                className={classNames(
                  "__wab_instance",
                  sty.componentListItem__xLaCa
                )}
              >
                {"Textbox"}
              </ComponentListItem>

              <ComponentListItem
                className={classNames(
                  "__wab_instance",
                  sty.componentListItem__mTRbM
                )}
              >
                {"Card"}
              </ComponentListItem>
            </React.Fragment>
          ),

          value: args.children,
        })}
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "searchContainer", "searchbox", "componentsContainer"],
  searchContainer: ["searchContainer", "searchbox"],
  searchbox: ["searchbox"],
  componentsContainer: ["componentsContainer"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  searchContainer: "div";
  searchbox: typeof Searchbox;
  componentsContainer: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicComponentsPanel__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> = {
  // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicComponentsPanel__VariantsArgs;
  args?: PlasmicComponentsPanel__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicComponentsPanel__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicComponentsPanel__ArgsType, ReservedPropsType> &
  // Specify overrides for each element directly as props
  Omit<
    NodeOverridesType<T>,
    ReservedPropsType | VariantPropType | ArgPropType
  > &
  // Specify props for the root element
  Omit<
    Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
    ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
  >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicComponentsPanel__ArgProps,
      internalVariantPropNames: PlasmicComponentsPanel__VariantProps,
    });

    return PlasmicComponentsPanel__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicComponentsPanel";
  } else {
    func.displayName = `PlasmicComponentsPanel.${nodeName}`;
  }
  return func;
}

export const PlasmicComponentsPanel = Object.assign(
  // Top-level PlasmicComponentsPanel renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    searchContainer: makeNodeComponent("searchContainer"),
    searchbox: makeNodeComponent("searchbox"),
    componentsContainer: makeNodeComponent("componentsContainer"),

    // Metadata about props expected for PlasmicComponentsPanel
    internalVariantProps: PlasmicComponentsPanel__VariantProps,
    internalArgProps: PlasmicComponentsPanel__ArgProps,
  }
);

export default PlasmicComponentsPanel;
/* prettier-ignore-end */
