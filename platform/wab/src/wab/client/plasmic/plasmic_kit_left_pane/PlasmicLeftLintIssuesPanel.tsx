/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: aukbrhkegRkQ6KizvhdUPT
// Component: xymZo1AIeU

import * as React from "react";

import {
  Flex as Flex__,
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";

import LeftPaneHeader from "../../components/studio/LeftPaneHeader"; // plasmic-import: XLa52PvduIy/component
import Button from "../../components/widgets/Button"; // plasmic-import: SEF-sRmSoqV5c/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_new_design_system_former_style_controls_css from "../plasmic_kit_style_controls/plasmic_plasmic_kit_styles_pane.module.css"; // plasmic-import: gYEVvAzCcLMHDVPvuYxkFh/projectcss
import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "../PP__plasmickit_left_pane.module.css"; // plasmic-import: aukbrhkegRkQ6KizvhdUPT/projectcss
import sty from "./PlasmicLeftLintIssuesPanel.module.css"; // plasmic-import: xymZo1AIeU/css

import PlusIcon from "../plasmic_kit/PlasmicIcon__Plus"; // plasmic-import: -k064DlQ8k8-L/icon
import ChevronDownSvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__ChevronDownSvg"; // plasmic-import: xZrB9_0ir/icon

createPlasmicElementProxy;

export type PlasmicLeftLintIssuesPanel__VariantMembers = {};
export type PlasmicLeftLintIssuesPanel__VariantsArgs = {};
type VariantPropType = keyof PlasmicLeftLintIssuesPanel__VariantsArgs;
export const PlasmicLeftLintIssuesPanel__VariantProps =
  new Array<VariantPropType>();

export type PlasmicLeftLintIssuesPanel__ArgsType = {};
type ArgPropType = keyof PlasmicLeftLintIssuesPanel__ArgsType;
export const PlasmicLeftLintIssuesPanel__ArgProps = new Array<ArgPropType>();

export type PlasmicLeftLintIssuesPanel__OverridesType = {
  root?: Flex__<"div">;
  leftPaneHeader?: Flex__<typeof LeftPaneHeader>;
  description?: Flex__<"div">;
  newComponentButton?: Flex__<typeof Button>;
  content?: Flex__<"div">;
};

export interface DefaultLeftLintIssuesPanelProps {
  className?: string;
}

const $$ = {};

function PlasmicLeftLintIssuesPanel__RenderFunc(props: {
  variants: PlasmicLeftLintIssuesPanel__VariantsArgs;
  args: PlasmicLeftLintIssuesPanel__ArgsType;
  overrides: PlasmicLeftLintIssuesPanel__OverridesType;
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
        plasmic_plasmic_kit_design_system_deprecated_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        plasmic_plasmic_kit_new_design_system_former_style_controls_css.plasmic_tokens,
        sty.root
      )}
    >
      <LeftPaneHeader
        data-plasmic-name={"leftPaneHeader"}
        data-plasmic-override={overrides.leftPaneHeader}
        actions={
          <Button
            data-plasmic-name={"newComponentButton"}
            data-plasmic-override={overrides.newComponentButton}
            endIcon={
              <ChevronDownSvgIcon
                className={classNames(projectcss.all, sty.svg___9O6Tw)}
                role={"img"}
              />
            }
            size={"wide"}
            startIcon={
              <PlusIcon
                className={classNames(projectcss.all, sty.svg__cxuNo)}
                role={"img"}
              />
            }
            type={["secondary"]}
            withIcons={["startIcon"]}
          >
            {"Refresh issues"}
          </Button>
        }
        className={classNames("__wab_instance", sty.leftPaneHeader)}
        description={
          <div
            data-plasmic-name={"description"}
            data-plasmic-override={overrides.description}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.description
            )}
          >
            {
              "Some issues have been identified with your project.  Please fix them to avoid problems."
            }
          </div>
        }
        noActions={true}
        title={"Issues"}
      />

      <div
        data-plasmic-name={"content"}
        data-plasmic-override={overrides.content}
        className={classNames(projectcss.all, sty.content)}
      />
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "leftPaneHeader",
    "description",
    "newComponentButton",
    "content",
  ],
  leftPaneHeader: ["leftPaneHeader", "description", "newComponentButton"],
  description: ["description"],
  newComponentButton: ["newComponentButton"],
  content: ["content"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  leftPaneHeader: typeof LeftPaneHeader;
  description: "div";
  newComponentButton: typeof Button;
  content: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicLeftLintIssuesPanel__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicLeftLintIssuesPanel__VariantsArgs;
    args?: PlasmicLeftLintIssuesPanel__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicLeftLintIssuesPanel__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicLeftLintIssuesPanel__ArgsType, ReservedPropsType> &
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
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicLeftLintIssuesPanel__ArgProps,
          internalVariantPropNames: PlasmicLeftLintIssuesPanel__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicLeftLintIssuesPanel__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicLeftLintIssuesPanel";
  } else {
    func.displayName = `PlasmicLeftLintIssuesPanel.${nodeName}`;
  }
  return func;
}

export const PlasmicLeftLintIssuesPanel = Object.assign(
  // Top-level PlasmicLeftLintIssuesPanel renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    leftPaneHeader: makeNodeComponent("leftPaneHeader"),
    description: makeNodeComponent("description"),
    newComponentButton: makeNodeComponent("newComponentButton"),
    content: makeNodeComponent("content"),

    // Metadata about props expected for PlasmicLeftLintIssuesPanel
    internalVariantProps: PlasmicLeftLintIssuesPanel__VariantProps,
    internalArgProps: PlasmicLeftLintIssuesPanel__ArgProps,
  }
);

export default PlasmicLeftLintIssuesPanel;
/* prettier-ignore-end */
