/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: aukbrhkegRkQ6KizvhdUPT
// Component: eMjSZ8G7mG

import * as React from "react";

import {
  Flex as Flex__,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  Stack as Stack__,
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  hasVariant,
  renderPlasmicSlot,
  useDollarState,
  useTrigger,
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";

import IconButton from "../../components/widgets/IconButton"; // plasmic-import: LPry-TF4j22a/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_new_design_system_former_style_controls_css from "../plasmic_kit_style_controls/plasmic_plasmic_kit_styles_pane.module.css"; // plasmic-import: gYEVvAzCcLMHDVPvuYxkFh/projectcss
import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "../PP__plasmickit_left_pane.module.css"; // plasmic-import: aukbrhkegRkQ6KizvhdUPT/projectcss
import sty from "./PlasmicTokenTypeHeader.module.css"; // plasmic-import: eMjSZ8G7mG/css

import ChevronDownSvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__ChevronDownSvg"; // plasmic-import: xZrB9_0ir/icon
import ChevronRightSvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__ChevronRightSvg"; // plasmic-import: HBGx-zeiX/icon
import PlusSvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__PlusSvg"; // plasmic-import: sQKgd2GNr/icon

createPlasmicElementProxy;

export type PlasmicTokenTypeHeader__VariantMembers = {
  isExpanded: "isExpanded";
  border: "top" | "bottom";
};
export type PlasmicTokenTypeHeader__VariantsArgs = {
  isExpanded?: SingleBooleanChoiceArg<"isExpanded">;
  border?: MultiChoiceArg<"top" | "bottom">;
};
type VariantPropType = keyof PlasmicTokenTypeHeader__VariantsArgs;
export const PlasmicTokenTypeHeader__VariantProps = new Array<VariantPropType>(
  "isExpanded",
  "border"
);

export type PlasmicTokenTypeHeader__ArgsType = {
  tokenType?: React.ReactNode;
  groupSize?: React.ReactNode;
};
type ArgPropType = keyof PlasmicTokenTypeHeader__ArgsType;
export const PlasmicTokenTypeHeader__ArgProps = new Array<ArgPropType>(
  "tokenType",
  "groupSize"
);

export type PlasmicTokenTypeHeader__OverridesType = {
  root?: Flex__<"div">;
  iconContainer?: Flex__<"div">;
  addButton?: Flex__<typeof IconButton>;
};

export interface DefaultTokenTypeHeaderProps {
  tokenType?: React.ReactNode;
  groupSize?: React.ReactNode;
  isExpanded?: SingleBooleanChoiceArg<"isExpanded">;
  border?: MultiChoiceArg<"top" | "bottom">;
  className?: string;
}

const $$ = {};

function PlasmicTokenTypeHeader__RenderFunc(props: {
  variants: PlasmicTokenTypeHeader__VariantsArgs;
  args: PlasmicTokenTypeHeader__ArgsType;
  overrides: PlasmicTokenTypeHeader__OverridesType;
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
        path: "isExpanded",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.isExpanded,
      },
      {
        path: "border",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.border,
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

  const [isRootHover, triggerRootHoverProps] = useTrigger("useHover", {});
  const triggers = {
    hover_root: isRootHover,
  };

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
        sty.root,
        {
          [sty.rootborder_bottom]: hasVariant($state, "border", "bottom"),
          [sty.rootborder_top]: hasVariant($state, "border", "top"),
          [sty.rootisExpanded]: hasVariant($state, "isExpanded", "isExpanded"),
        }
      )}
      data-plasmic-trigger-props={[triggerRootHoverProps]}
    >
      <Stack__
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox___2Aimk, {
          [sty.freeBoxborder_top___2AimkbxlKh]: hasVariant(
            $state,
            "border",
            "top"
          ),
          [sty.freeBoxisExpanded___2AimkaTp]: hasVariant(
            $state,
            "isExpanded",
            "isExpanded"
          ),
        })}
      >
        <div
          data-plasmic-name={"iconContainer"}
          data-plasmic-override={overrides.iconContainer}
          className={classNames(projectcss.all, sty.iconContainer)}
        >
          <ChevronRightSvgIcon
            className={classNames(projectcss.all, sty.svg__lV3Wg, {
              [sty.svgisExpanded__lV3WgaTp]: hasVariant(
                $state,
                "isExpanded",
                "isExpanded"
              ),
            })}
            role={"img"}
          />
        </div>
        <Stack__
          as={"div"}
          hasGap={true}
          className={classNames(projectcss.all, sty.freeBox__cp1Xx)}
        >
          {renderPlasmicSlot({
            defaultContents: "Colors",
            value: args.tokenType,
            className: classNames(sty.slotTargetTokenType),
          })}
          <div className={classNames(projectcss.all, sty.freeBox__etXdI)}>
            {renderPlasmicSlot({
              defaultContents: "0",
              value: args.groupSize,
              className: classNames(sty.slotTargetGroupSize),
            })}
          </div>
        </Stack__>
      </Stack__>
      <div
        className={classNames(projectcss.all, sty.freeBox___36Lfh, {
          [sty.freeBoxisExpanded___36LfHaTp]: hasVariant(
            $state,
            "isExpanded",
            "isExpanded"
          ),
        })}
      >
        <IconButton
          data-plasmic-name={"addButton"}
          data-plasmic-override={overrides.addButton}
          children2={
            <ChevronDownSvgIcon
              className={classNames(projectcss.all, sty.svg__jqg1)}
              role={"img"}
            />
          }
          className={classNames("__wab_instance", sty.addButton, {
            [sty.addButtonisExpanded]: hasVariant(
              $state,
              "isExpanded",
              "isExpanded"
            ),
          })}
          size={"small"}
        >
          <PlusSvgIcon
            className={classNames(projectcss.all, sty.svg__ihGm1)}
            role={"img"}
          />
        </IconButton>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "iconContainer", "addButton"],
  iconContainer: ["iconContainer"],
  addButton: ["addButton"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  iconContainer: "div";
  addButton: typeof IconButton;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTokenTypeHeader__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTokenTypeHeader__VariantsArgs;
    args?: PlasmicTokenTypeHeader__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTokenTypeHeader__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicTokenTypeHeader__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicTokenTypeHeader__ArgProps,
          internalVariantPropNames: PlasmicTokenTypeHeader__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicTokenTypeHeader__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicTokenTypeHeader";
  } else {
    func.displayName = `PlasmicTokenTypeHeader.${nodeName}`;
  }
  return func;
}

export const PlasmicTokenTypeHeader = Object.assign(
  // Top-level PlasmicTokenTypeHeader renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    iconContainer: makeNodeComponent("iconContainer"),
    addButton: makeNodeComponent("addButton"),

    // Metadata about props expected for PlasmicTokenTypeHeader
    internalVariantProps: PlasmicTokenTypeHeader__VariantProps,
    internalArgProps: PlasmicTokenTypeHeader__ArgProps,
  }
);

export default PlasmicTokenTypeHeader;
/* prettier-ignore-end */
