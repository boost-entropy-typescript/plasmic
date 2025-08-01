/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: gYEVvAzCcLMHDVPvuYxkFh
// Component: bqUvK9cs5w

import * as React from "react";

import {
  Flex as Flex__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
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

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "./plasmic_plasmic_kit_styles_pane.module.css"; // plasmic-import: gYEVvAzCcLMHDVPvuYxkFh/projectcss
import sty from "./PlasmicStyleToggleButton.module.css"; // plasmic-import: bqUvK9cs5w/css

import CloseIcon from "../plasmic_kit/PlasmicIcon__Close"; // plasmic-import: hy7vKrgdAZwW4/icon

createPlasmicElementProxy;

export type PlasmicStyleToggleButton__VariantMembers = {
  valueSetState: "isUnset" | "isSet" | "isInherited";
  isDisabled: "isDisabled";
  showLabel: "showLabel";
  stretched: "stretched";
  noIcon: "noIcon";
  styleType: "tight";
};
export type PlasmicStyleToggleButton__VariantsArgs = {
  valueSetState?: SingleChoiceArg<"isUnset" | "isSet" | "isInherited">;
  isDisabled?: SingleBooleanChoiceArg<"isDisabled">;
  showLabel?: SingleBooleanChoiceArg<"showLabel">;
  stretched?: SingleBooleanChoiceArg<"stretched">;
  noIcon?: SingleBooleanChoiceArg<"noIcon">;
  styleType?: SingleChoiceArg<"tight">;
};
type VariantPropType = keyof PlasmicStyleToggleButton__VariantsArgs;
export const PlasmicStyleToggleButton__VariantProps =
  new Array<VariantPropType>(
    "valueSetState",
    "isDisabled",
    "showLabel",
    "stretched",
    "noIcon",
    "styleType"
  );

export type PlasmicStyleToggleButton__ArgsType = {
  children?: React.ReactNode;
  label?: React.ReactNode;
  styleValue?: string;
};
type ArgPropType = keyof PlasmicStyleToggleButton__ArgsType;
export const PlasmicStyleToggleButton__ArgProps = new Array<ArgPropType>(
  "children",
  "label",
  "styleValue"
);

export type PlasmicStyleToggleButton__OverridesType = {
  root?: Flex__<"button">;
  iconContainer?: Flex__<"div">;
  labelContainer?: Flex__<"div">;
};

export interface DefaultStyleToggleButtonProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  styleValue?: string;
  valueSetState?: SingleChoiceArg<"isUnset" | "isSet" | "isInherited">;
  isDisabled?: SingleBooleanChoiceArg<"isDisabled">;
  showLabel?: SingleBooleanChoiceArg<"showLabel">;
  stretched?: SingleBooleanChoiceArg<"stretched">;
  noIcon?: SingleBooleanChoiceArg<"noIcon">;
  styleType?: SingleChoiceArg<"tight">;
  className?: string;
}

const $$ = {};

function PlasmicStyleToggleButton__RenderFunc(props: {
  variants: PlasmicStyleToggleButton__VariantsArgs;
  args: PlasmicStyleToggleButton__ArgsType;
  overrides: PlasmicStyleToggleButton__OverridesType;
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
        path: "valueSetState",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.valueSetState,
      },
      {
        path: "isDisabled",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.isDisabled,
      },
      {
        path: "showLabel",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.showLabel,
      },
      {
        path: "stretched",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.stretched,
      },
      {
        path: "noIcon",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.noIcon,
      },
      {
        path: "styleType",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.styleType,
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

  const [isRootFocusVisible, triggerRootFocusVisibleProps] = useTrigger(
    "useFocusVisible",
    {
      isTextInput: false,
    }
  );
  const triggers = {
    focusVisible_root: isRootFocusVisible,
  };

  return (
    <Stack__
      as={"button"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.button,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_plasmic_kit_design_system_deprecated_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root,
        {
          [sty.root___focusVisible]: triggers.focusVisible_root,
          [sty.rootisDisabled]: hasVariant($state, "isDisabled", "isDisabled"),
          [sty.rootnoIcon]: hasVariant($state, "noIcon", "noIcon"),
          [sty.rootnoIcon_showLabel]:
            hasVariant($state, "showLabel", "showLabel") &&
            hasVariant($state, "noIcon", "noIcon"),
          [sty.rootshowLabel]: hasVariant($state, "showLabel", "showLabel"),
          [sty.rootstretched]: hasVariant($state, "stretched", "stretched"),
          [sty.rootstyleType_tight]: hasVariant($state, "styleType", "tight"),
          [sty.rootvalueSetState_isInherited]: hasVariant(
            $state,
            "valueSetState",
            "isInherited"
          ),
          [sty.rootvalueSetState_isSet]: hasVariant(
            $state,
            "valueSetState",
            "isSet"
          ),
          [sty.rootvalueSetState_isUnset]: hasVariant(
            $state,
            "valueSetState",
            "isUnset"
          ),
        }
      )}
      data-plasmic-trigger-props={[triggerRootFocusVisibleProps]}
    >
      {(hasVariant($state, "noIcon", "noIcon") ? false : true) ? (
        <div
          data-plasmic-name={"iconContainer"}
          data-plasmic-override={overrides.iconContainer}
          className={classNames(
            projectcss.all,
            sty.iconContainer,
            "monochrome-exempt",
            {
              [sty.iconContainernoIcon]: hasVariant($state, "noIcon", "noIcon"),
              [sty.iconContainervalueSetState_isInherited]: hasVariant(
                $state,
                "valueSetState",
                "isInherited"
              ),
              [sty.iconContainervalueSetState_isSet]: hasVariant(
                $state,
                "valueSetState",
                "isSet"
              ),
            }
          )}
        >
          {renderPlasmicSlot({
            defaultContents: (
              <CloseIcon
                className={classNames(projectcss.all, sty.svg__rqz6E)}
                role={"img"}
              />
            ),

            value: args.children,
            className: classNames(sty.slotTargetChildren, {
              [sty.slotTargetChildrenisDisabled]: hasVariant(
                $state,
                "isDisabled",
                "isDisabled"
              ),
              [sty.slotTargetChildrenvalueSetState_isInherited]: hasVariant(
                $state,
                "valueSetState",
                "isInherited"
              ),
              [sty.slotTargetChildrenvalueSetState_isSet]: hasVariant(
                $state,
                "valueSetState",
                "isSet"
              ),
              [sty.slotTargetChildrenvalueSetState_isUnset]: hasVariant(
                $state,
                "valueSetState",
                "isUnset"
              ),
            }),
          })}
        </div>
      ) : null}
      {(
        hasVariant($state, "noIcon", "noIcon")
          ? true
          : hasVariant($state, "showLabel", "showLabel")
          ? true
          : false
      ) ? (
        <div
          data-plasmic-name={"labelContainer"}
          data-plasmic-override={overrides.labelContainer}
          className={classNames(projectcss.all, sty.labelContainer, {
            [sty.labelContainernoIcon]: hasVariant($state, "noIcon", "noIcon"),
            [sty.labelContainernoIcon_showLabel]:
              hasVariant($state, "showLabel", "showLabel") &&
              hasVariant($state, "noIcon", "noIcon"),
            [sty.labelContainershowLabel]: hasVariant(
              $state,
              "showLabel",
              "showLabel"
            ),
            [sty.labelContainervalueSetState_isSet]: hasVariant(
              $state,
              "valueSetState",
              "isSet"
            ),
          })}
        >
          {renderPlasmicSlot({
            defaultContents: "Label",
            value: args.label,
            className: classNames(sty.slotTargetLabel, {
              [sty.slotTargetLabelnoIcon]: hasVariant(
                $state,
                "noIcon",
                "noIcon"
              ),
              [sty.slotTargetLabelshowLabel]: hasVariant(
                $state,
                "showLabel",
                "showLabel"
              ),
              [sty.slotTargetLabelstretched]: hasVariant(
                $state,
                "stretched",
                "stretched"
              ),
              [sty.slotTargetLabelvalueSetState_isInherited]: hasVariant(
                $state,
                "valueSetState",
                "isInherited"
              ),
              [sty.slotTargetLabelvalueSetState_isSet]: hasVariant(
                $state,
                "valueSetState",
                "isSet"
              ),
              [sty.slotTargetLabelvalueSetState_isSet_showLabel]:
                hasVariant($state, "valueSetState", "isSet") &&
                hasVariant($state, "showLabel", "showLabel"),
              [sty.slotTargetLabelvalueSetState_isUnset]: hasVariant(
                $state,
                "valueSetState",
                "isUnset"
              ),
            }),
          })}
        </div>
      ) : null}
    </Stack__>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "iconContainer", "labelContainer"],
  iconContainer: ["iconContainer"],
  labelContainer: ["labelContainer"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "button";
  iconContainer: "div";
  labelContainer: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicStyleToggleButton__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicStyleToggleButton__VariantsArgs;
    args?: PlasmicStyleToggleButton__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicStyleToggleButton__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicStyleToggleButton__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicStyleToggleButton__ArgProps,
          internalVariantPropNames: PlasmicStyleToggleButton__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicStyleToggleButton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicStyleToggleButton";
  } else {
    func.displayName = `PlasmicStyleToggleButton.${nodeName}`;
  }
  return func;
}

export const PlasmicStyleToggleButton = Object.assign(
  // Top-level PlasmicStyleToggleButton renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    iconContainer: makeNodeComponent("iconContainer"),
    labelContainer: makeNodeComponent("labelContainer"),

    // Metadata about props expected for PlasmicStyleToggleButton
    internalVariantProps: PlasmicStyleToggleButton__VariantProps,
    internalArgProps: PlasmicStyleToggleButton__ArgProps,
  }
);

export default PlasmicStyleToggleButton;
/* prettier-ignore-end */
