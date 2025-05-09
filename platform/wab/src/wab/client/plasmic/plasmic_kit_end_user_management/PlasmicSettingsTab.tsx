// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 2dMe7XWUq916KsPnra5vYj
// Component: bRXkugOm8Ra

import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/react-web/lib/host";

import {
  StrictProps,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
} from "@plasmicapp/react-web";
import StyleSelect from "../../components/style-controls/StyleSelect"; // plasmic-import: E0bKgamUEin/component
import Button from "../../components/widgets/Button"; // plasmic-import: SEF-sRmSoqV5c/component
import IconButton from "../../components/widgets/IconButton"; // plasmic-import: LPry-TF4j22a/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_style_controls_css from "../plasmic_kit_style_controls/plasmic_plasmic_kit_styles_pane.module.css"; // plasmic-import: gYEVvAzCcLMHDVPvuYxkFh/projectcss
import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "./plasmic_plasmic_kit_end_user_management.module.css"; // plasmic-import: 2dMe7XWUq916KsPnra5vYj/projectcss
import sty from "./PlasmicSettingsTab.module.css"; // plasmic-import: bRXkugOm8Ra/css

import ArrowRightIcon from "../plasmic_kit/PlasmicIcon__ArrowRight"; // plasmic-import: etkVJMeZvaFjM/icon
import ArrowRightsvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__ArrowRightSvg"; // plasmic-import: 9Jv8jb253/icon
import ChevronDownsvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__ChevronDownSvg"; // plasmic-import: xZrB9_0ir/icon
import PlussvgIcon from "../plasmic_kit_icons/icons/PlasmicIcon__PlusSvg"; // plasmic-import: sQKgd2GNr/icon

createPlasmicElementProxy;

export type PlasmicSettingsTab__VariantMembers = {};
export type PlasmicSettingsTab__VariantsArgs = {};
type VariantPropType = keyof PlasmicSettingsTab__VariantsArgs;
export const PlasmicSettingsTab__VariantProps = new Array<VariantPropType>();

export type PlasmicSettingsTab__ArgsType = {
  roles?: React.ReactNode;
  providerSettings?: React.ReactNode;
};
type ArgPropType = keyof PlasmicSettingsTab__ArgsType;
export const PlasmicSettingsTab__ArgProps = new Array<ArgPropType>(
  "roles",
  "providerSettings"
);

export type PlasmicSettingsTab__OverridesType = {
  root?: p.Flex<"div">;
  providerLabel?: p.Flex<"div">;
  providerSelect?: p.Flex<typeof StyleSelect>;
  directoryLabel?: p.Flex<"div">;
  directorySelect?: p.Flex<typeof StyleSelect>;
  manageBtn?: p.Flex<typeof Button>;
  rolesLabel?: p.Flex<"div">;
  addRoleBtn?: p.Flex<typeof IconButton>;
  roleNeededRow?: p.Flex<"div">;
  defaultRoleLabel?: p.Flex<"div">;
  roleSelect?: p.Flex<typeof StyleSelect>;
};

export interface DefaultSettingsTabProps {
  roles?: React.ReactNode;
  providerSettings?: React.ReactNode;
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicSettingsTab__RenderFunc(props: {
  variants: PlasmicSettingsTab__VariantsArgs;
  args: PlasmicSettingsTab__ArgsType;
  overrides: PlasmicSettingsTab__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants,
  };

  const $ctx = ph.useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = p.useCurrentUser?.() || {};

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
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_style_controls_css.plasmic_tokens,
        sty.root
      )}
    >
      <div className={classNames(projectcss.all, sty.columns__kx3Gs)}>
        <div className={classNames(projectcss.all, sty.column__udGuw)}>
          <div
            data-plasmic-name={"providerLabel"}
            data-plasmic-override={overrides.providerLabel}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.providerLabel
            )}
          >
            {"Provider"}
          </div>
        </div>
        <div className={classNames(projectcss.all, sty.column__rW0DU)}>
          <StyleSelect
            data-plasmic-name={"providerSelect"}
            data-plasmic-override={overrides.providerSelect}
            className={classNames("__wab_instance", sty.providerSelect)}
            valueSetState={"isSet" as const}
          />
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__it4Pf)}>
        {p.renderPlasmicSlot({
          defaultContents: null,
          value: args.providerSettings,
        })}
      </div>
      <div className={classNames(projectcss.all, sty.columns__dm2Yt)}>
        <div className={classNames(projectcss.all, sty.column__oCxJ)}>
          <div
            data-plasmic-name={"directoryLabel"}
            data-plasmic-override={overrides.directoryLabel}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.directoryLabel
            )}
          >
            {"User directory"}
          </div>
        </div>
        <div className={classNames(projectcss.all, sty.column__gHt5R)}>
          {true ? (
            <p.Stack
              as={"div"}
              hasGap={true}
              className={classNames(projectcss.all, sty.freeBox__j41Mv)}
            >
              <StyleSelect
                data-plasmic-name={"directorySelect"}
                data-plasmic-override={overrides.directorySelect}
                className={classNames("__wab_instance", sty.directorySelect)}
                valueSetState={"isSet" as const}
              />

              <Button
                data-plasmic-name={"manageBtn"}
                data-plasmic-override={overrides.manageBtn}
                className={classNames("__wab_instance", sty.manageBtn)}
                endIcon={
                  <ArrowRightIcon
                    className={classNames(projectcss.all, sty.svg__o1Em8)}
                    role={"img"}
                  />
                }
                size={"wide" as const}
                startIcon={
                  <ArrowRightsvgIcon
                    className={classNames(projectcss.all, sty.svg___4EIy)}
                    role={"img"}
                  />
                }
                type={["clear"]}
                withIcons={["endIcon"]}
              >
                {"Manage"}
              </Button>
            </p.Stack>
          ) : null}
        </div>
      </div>
      <div className={classNames(projectcss.all, sty.columns__xu0Xg)}>
        <div className={classNames(projectcss.all, sty.column__b3BAv)}>
          <div
            data-plasmic-name={"rolesLabel"}
            data-plasmic-override={overrides.rolesLabel}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.rolesLabel
            )}
          >
            {"Roles"}
          </div>
        </div>
        <div className={classNames(projectcss.all, sty.column__bdpF)}>
          <div className={classNames(projectcss.all, sty.freeBox__vp4T)}>
            {p.renderPlasmicSlot({
              defaultContents: null,
              value: args.roles,
            })}
          </div>
        </div>
        <div className={classNames(projectcss.all, sty.column__m532O)}>
          <IconButton
            data-plasmic-name={"addRoleBtn"}
            data-plasmic-override={overrides.addRoleBtn}
            children2={
              <ChevronDownsvgIcon
                className={classNames(projectcss.all, sty.svg__qDk5)}
                role={"img"}
              />
            }
            className={classNames("__wab_instance", sty.addRoleBtn)}
          >
            <PlussvgIcon
              className={classNames(projectcss.all, sty.svg___3Ya4W)}
              role={"img"}
            />
          </IconButton>
        </div>
      </div>
      {true ? (
        <div className={classNames(projectcss.all, sty.freeBox__kvqUw)}>
          <div
            data-plasmic-name={"roleNeededRow"}
            data-plasmic-override={overrides.roleNeededRow}
            className={classNames(projectcss.all, sty.roleNeededRow)}
          >
            <div className={classNames(projectcss.all, sty.column__oO9R2)}>
              <div
                data-plasmic-name={"defaultRoleLabel"}
                data-plasmic-override={overrides.defaultRoleLabel}
                className={classNames(
                  projectcss.all,
                  projectcss.__wab_text,
                  sty.defaultRoleLabel
                )}
              >
                {"Default min role"}
              </div>
            </div>
            <div className={classNames(projectcss.all, sty.column__f3Cki)}>
              <StyleSelect
                data-plasmic-name={"roleSelect"}
                data-plasmic-override={overrides.roleSelect}
                className={classNames("__wab_instance", sty.roleSelect)}
                valueSetState={"isSet" as const}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "providerLabel",
    "providerSelect",
    "directoryLabel",
    "directorySelect",
    "manageBtn",
    "rolesLabel",
    "addRoleBtn",
    "roleNeededRow",
    "defaultRoleLabel",
    "roleSelect",
  ],

  providerLabel: ["providerLabel"],
  providerSelect: ["providerSelect"],
  directoryLabel: ["directoryLabel"],
  directorySelect: ["directorySelect"],
  manageBtn: ["manageBtn"],
  rolesLabel: ["rolesLabel"],
  addRoleBtn: ["addRoleBtn"],
  roleNeededRow: ["roleNeededRow", "defaultRoleLabel", "roleSelect"],
  defaultRoleLabel: ["defaultRoleLabel"],
  roleSelect: ["roleSelect"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  providerLabel: "div";
  providerSelect: typeof StyleSelect;
  directoryLabel: "div";
  directorySelect: typeof StyleSelect;
  manageBtn: typeof Button;
  rolesLabel: "div";
  addRoleBtn: typeof IconButton;
  roleNeededRow: "div";
  defaultRoleLabel: "div";
  roleSelect: typeof StyleSelect;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicSettingsTab__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicSettingsTab__VariantsArgs;
    args?: PlasmicSettingsTab__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicSettingsTab__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicSettingsTab__ArgsType,
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
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicSettingsTab__ArgProps,
          internalVariantPropNames: PlasmicSettingsTab__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicSettingsTab__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicSettingsTab";
  } else {
    func.displayName = `PlasmicSettingsTab.${nodeName}`;
  }
  return func;
}

export const PlasmicSettingsTab = Object.assign(
  // Top-level PlasmicSettingsTab renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    providerLabel: makeNodeComponent("providerLabel"),
    providerSelect: makeNodeComponent("providerSelect"),
    directoryLabel: makeNodeComponent("directoryLabel"),
    directorySelect: makeNodeComponent("directorySelect"),
    manageBtn: makeNodeComponent("manageBtn"),
    rolesLabel: makeNodeComponent("rolesLabel"),
    addRoleBtn: makeNodeComponent("addRoleBtn"),
    roleNeededRow: makeNodeComponent("roleNeededRow"),
    defaultRoleLabel: makeNodeComponent("defaultRoleLabel"),
    roleSelect: makeNodeComponent("roleSelect"),

    // Metadata about props expected for PlasmicSettingsTab
    internalVariantProps: PlasmicSettingsTab__VariantProps,
    internalArgProps: PlasmicSettingsTab__ArgProps,
  }
);

export default PlasmicSettingsTab;
/* prettier-ignore-end */
