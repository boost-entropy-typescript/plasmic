// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: ooL7EhXDmFQWnW9sxtchhE
// Component: F7n0gyM6hJ6

import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/react-web/lib/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from "@plasmicapp/react-web";
import DefaultLayout from "../../components/dashboard/DefaultLayout"; // plasmic-import: nSkQWLjK-B/component
import CmsSection from "../../../../CmsSection"; // plasmic-import: 54ykx6A8G6T/component
import CmsListItem from "../../../../CmsListItem"; // plasmic-import: DEllwXrn27Q/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_pricing_css from "../plasmic_kit_pricing/plasmic_plasmic_kit_pricing.module.css"; // plasmic-import: ehckhYnyDHgCBbV47m9bkf/projectcss
import projectcss from "../PP__plasmickit_dashboard.module.css"; // plasmic-import: ooL7EhXDmFQWnW9sxtchhE/projectcss
import sty from "./PlasmicCmsPage.module.css"; // plasmic-import: F7n0gyM6hJ6/css

createPlasmicElementProxy;

export type PlasmicCmsPage__VariantMembers = {};
export type PlasmicCmsPage__VariantsArgs = {};
type VariantPropType = keyof PlasmicCmsPage__VariantsArgs;
export const PlasmicCmsPage__VariantProps = new Array<VariantPropType>();

export type PlasmicCmsPage__ArgsType = {};
type ArgPropType = keyof PlasmicCmsPage__ArgsType;
export const PlasmicCmsPage__ArgProps = new Array<ArgPropType>();

export type PlasmicCmsPage__OverridesType = {
  root?: p.Flex<"div">;
  defaultLayout?: p.Flex<typeof DefaultLayout>;
  cmsSection?: p.Flex<typeof CmsSection>;
  noProjectsText?: p.Flex<"div">;
};

export interface DefaultCmsPageProps {
  className?: string;
}

const $$ = {};

function PlasmicCmsPage__RenderFunc(props: {
  variants: PlasmicCmsPage__VariantsArgs;
  args: PlasmicCmsPage__ArgsType;
  overrides: PlasmicCmsPage__OverridesType;
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
    <React.Fragment>
      <div className={projectcss.plasmic_page_wrapper}>
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
            plasmic_plasmic_kit_pricing_css.plasmic_tokens,
            sty.root
          )}
        >
          <DefaultLayout
            data-plasmic-name={"defaultLayout"}
            data-plasmic-override={overrides.defaultLayout}
            className={classNames("__wab_instance", sty.defaultLayout)}
            hideTeams={true}
            teams={null}
          >
            <CmsSection
              data-plasmic-name={"cmsSection"}
              data-plasmic-override={overrides.cmsSection}
              className={classNames("__wab_instance", sty.cmsSection)}
              noProjectsText={
                <div
                  data-plasmic-name={"noProjectsText"}
                  data-plasmic-override={overrides.noProjectsText}
                  className={classNames(
                    projectcss.all,
                    projectcss.__wab_text,
                    sty.noProjectsText
                  )}
                >
                  {"This workspace has no projects."}
                </div>
              }
            >
              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem__eygmj)}
                isFirstItem={true}
              />

              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem__dqvsB)}
              />

              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem___97Bp)}
              />

              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem__fU7Ah)}
              />

              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem__dHh6F)}
              />

              <CmsListItem
                className={classNames(
                  "__wab_instance",
                  sty.cmsListItem___6SZ74
                )}
              />

              <CmsListItem
                className={classNames("__wab_instance", sty.cmsListItem__dePtP)}
              />
            </CmsSection>
          </DefaultLayout>
        </div>
      </div>
    </React.Fragment>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "defaultLayout", "cmsSection", "noProjectsText"],
  defaultLayout: ["defaultLayout", "cmsSection", "noProjectsText"],
  cmsSection: ["cmsSection", "noProjectsText"],
  noProjectsText: ["noProjectsText"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  defaultLayout: typeof DefaultLayout;
  cmsSection: typeof CmsSection;
  noProjectsText: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicCmsPage__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicCmsPage__VariantsArgs;
    args?: PlasmicCmsPage__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicCmsPage__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicCmsPage__ArgsType,
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
          internalArgPropNames: PlasmicCmsPage__ArgProps,
          internalVariantPropNames: PlasmicCmsPage__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicCmsPage__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicCmsPage";
  } else {
    func.displayName = `PlasmicCmsPage.${nodeName}`;
  }
  return func;
}

export const PlasmicCmsPage = Object.assign(
  // Top-level PlasmicCmsPage renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    defaultLayout: makeNodeComponent("defaultLayout"),
    cmsSection: makeNodeComponent("cmsSection"),
    noProjectsText: makeNodeComponent("noProjectsText"),

    // Metadata about props expected for PlasmicCmsPage
    internalVariantProps: PlasmicCmsPage__VariantProps,
    internalArgProps: PlasmicCmsPage__ArgProps,

    // Page metadata
    pageMetadata: {
      title: "",
      description: "",
      ogImageSrc: "",
      canonical: "",
    },
  }
);

export default PlasmicCmsPage;
/* prettier-ignore-end */