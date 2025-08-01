/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: ooL7EhXDmFQWnW9sxtchhE
// Component: UttGK3xVrb

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
  ensureGlobalVariants,
  hasVariant,
  renderPlasmicSlot,
  useDollarState,
  useTrigger,
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";

import { useEnvironment } from "../plasmic_kit_pricing/PlasmicGlobalVariant__Environment"; // plasmic-import: hIjF9NLAUKG-/globalVariant

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_pricing_css from "../plasmic_kit_pricing/plasmic_plasmic_kit_pricing.module.css"; // plasmic-import: ehckhYnyDHgCBbV47m9bkf/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import projectcss from "../PP__plasmickit_dashboard.module.css"; // plasmic-import: ooL7EhXDmFQWnW9sxtchhE/projectcss
import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import sty from "./PlasmicEditableResourceName.module.css"; // plasmic-import: UttGK3xVrb/css

import EditSvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__EditSvg"; // plasmic-import: _Qa2gdunG/icon

createPlasmicElementProxy;

export type PlasmicEditableResourceName__VariantMembers = {
  state: "hover";
  cantEdit: "cantEdit";
  size: "small";
};
export type PlasmicEditableResourceName__VariantsArgs = {
  state?: SingleChoiceArg<"hover">;
  cantEdit?: SingleBooleanChoiceArg<"cantEdit">;
  size?: SingleChoiceArg<"small">;
};
type VariantPropType = keyof PlasmicEditableResourceName__VariantsArgs;
export const PlasmicEditableResourceName__VariantProps =
  new Array<VariantPropType>("state", "cantEdit", "size");

export type PlasmicEditableResourceName__ArgsType = { name?: React.ReactNode };
type ArgPropType = keyof PlasmicEditableResourceName__ArgsType;
export const PlasmicEditableResourceName__ArgProps = new Array<ArgPropType>(
  "name"
);

export type PlasmicEditableResourceName__OverridesType = {
  root?: Flex__<"div">;
  editButton?: Flex__<"button">;
  svg?: Flex__<"svg">;
};

export interface DefaultEditableResourceNameProps {
  name?: React.ReactNode;
  state?: SingleChoiceArg<"hover">;
  cantEdit?: SingleBooleanChoiceArg<"cantEdit">;
  size?: SingleChoiceArg<"small">;
  className?: string;
}

const $$ = {};

function PlasmicEditableResourceName__RenderFunc(props: {
  variants: PlasmicEditableResourceName__VariantsArgs;
  args: PlasmicEditableResourceName__ArgsType;
  overrides: PlasmicEditableResourceName__OverridesType;
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
        path: "state",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.state,
      },
      {
        path: "cantEdit",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.cantEdit,
      },
      {
        path: "size",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.size,
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

  const globalVariants = ensureGlobalVariants({
    environment: useEnvironment(),
  });

  return (
    <Stack__
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_plasmic_kit_design_system_deprecated_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        plasmic_plasmic_kit_pricing_css.plasmic_tokens,
        sty.root,
        {
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [plasmic_plasmic_kit_pricing_css.global_environment_website]:
            hasVariant(globalVariants, "environment", "website"),
          [sty.rootcantEdit]: hasVariant($state, "cantEdit", "cantEdit"),
          [sty.rootsize_small]: hasVariant($state, "size", "small"),
          [sty.rootstate_hover]: hasVariant($state, "state", "hover"),
        }
      )}
      data-plasmic-trigger-props={[triggerRootHoverProps]}
    >
      {renderPlasmicSlot({
        defaultContents: "Untitled",
        value: args.name,
        className: classNames(sty.slotTargetName, {
          [sty.slotTargetNamecantEdit]: hasVariant(
            $state,
            "cantEdit",
            "cantEdit"
          ),
          [sty.slotTargetNamesize_small]: hasVariant($state, "size", "small"),
          [sty.slotTargetNamestate_hover]: hasVariant($state, "state", "hover"),
        }),
      })}
      {(
        hasVariant($state, "cantEdit", "cantEdit") && triggers.hover_root
          ? true
          : triggers.hover_root
          ? true
          : hasVariant($state, "cantEdit", "cantEdit")
          ? false
          : hasVariant($state, "state", "hover")
          ? true
          : false
      ) ? (
        <button
          data-plasmic-name={"editButton"}
          data-plasmic-override={overrides.editButton}
          className={classNames(
            projectcss.all,
            projectcss.button,
            sty.editButton,
            {
              [sty.editButtoncantEdit]: hasVariant(
                $state,
                "cantEdit",
                "cantEdit"
              ),
              [sty.editButtonsize_small]: hasVariant($state, "size", "small"),
              [sty.editButtonstate_hover]: hasVariant($state, "state", "hover"),
            }
          )}
          ref={(ref) => {
            $refs["editButton"] = ref;
          }}
          title={"Rename"}
        >
          <EditSvgIcon
            data-plasmic-name={"svg"}
            data-plasmic-override={overrides.svg}
            className={classNames(projectcss.all, sty.svg, {
              [sty.svgstate_hover]: hasVariant($state, "state", "hover"),
            })}
            role={"img"}
          />
        </button>
      ) : null}
    </Stack__>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "editButton", "svg"],
  editButton: ["editButton", "svg"],
  svg: ["svg"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  editButton: "button";
  svg: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicEditableResourceName__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicEditableResourceName__VariantsArgs;
    args?: PlasmicEditableResourceName__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicEditableResourceName__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicEditableResourceName__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicEditableResourceName__ArgProps,
          internalVariantPropNames: PlasmicEditableResourceName__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicEditableResourceName__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicEditableResourceName";
  } else {
    func.displayName = `PlasmicEditableResourceName.${nodeName}`;
  }
  return func;
}

export const PlasmicEditableResourceName = Object.assign(
  // Top-level PlasmicEditableResourceName renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    editButton: makeNodeComponent("editButton"),
    svg: makeNodeComponent("svg"),

    // Metadata about props expected for PlasmicEditableResourceName
    internalVariantProps: PlasmicEditableResourceName__VariantProps,
    internalArgProps: PlasmicEditableResourceName__ArgProps,
  }
);

export default PlasmicEditableResourceName;
/* prettier-ignore-end */
