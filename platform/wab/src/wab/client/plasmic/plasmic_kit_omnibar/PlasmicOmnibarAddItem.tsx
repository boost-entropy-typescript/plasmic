// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: fQPf2UiMEMhB52C8QQXwWe
// Component: KnUjAGcQKT

import * as React from "react";

import {
  Flex as Flex__,
  PlasmicImg as PlasmicImg__,
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

import { Video } from "@plasmicpkgs/plasmic-basic-components";

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import projectcss from "./plasmic_plasmic_kit_omnibar.module.css"; // plasmic-import: fQPf2UiMEMhB52C8QQXwWe/projectcss
import sty from "./PlasmicOmnibarAddItem.module.css"; // plasmic-import: KnUjAGcQKT/css

import image49X6ZsC5Ww5 from "../plasmic_kit_design_system/images/image4.svg"; // plasmic-import: 9X6ZsC5ww5/picture

createPlasmicElementProxy;

export type PlasmicOmnibarAddItem__VariantMembers = {
  focused: "focused";
  preview: "image" | "video";
  installOnly: "installOnly";
  _new: "_new";
};
export type PlasmicOmnibarAddItem__VariantsArgs = {
  focused?: SingleBooleanChoiceArg<"focused">;
  preview?: SingleChoiceArg<"image" | "video">;
  installOnly?: SingleBooleanChoiceArg<"installOnly">;
  _new?: SingleBooleanChoiceArg<"_new">;
};
type VariantPropType = keyof PlasmicOmnibarAddItem__VariantsArgs;
export const PlasmicOmnibarAddItem__VariantProps = new Array<VariantPropType>(
  "focused",
  "preview",
  "installOnly",
  "_new"
);

export type PlasmicOmnibarAddItem__ArgsType = {
  title?: React.ReactNode;
  previewNode?: React.ReactNode;
  hoverText?: string;
  previewImageUrl?: string;
  previewVideoUrl?: string;
};
type ArgPropType = keyof PlasmicOmnibarAddItem__ArgsType;
export const PlasmicOmnibarAddItem__ArgProps = new Array<ArgPropType>(
  "title",
  "previewNode",
  "hoverText",
  "previewImageUrl",
  "previewVideoUrl"
);

export type PlasmicOmnibarAddItem__OverridesType = {
  root?: Flex__<"div">;
  img?: Flex__<typeof PlasmicImg__>;
  htmlVideo?: Flex__<typeof Video>;
  titleBox?: Flex__<"div">;
};

export interface DefaultOmnibarAddItemProps {
  title?: React.ReactNode;
  previewNode?: React.ReactNode;
  hoverText?: string;
  previewImageUrl?: string;
  previewVideoUrl?: string;
  focused?: SingleBooleanChoiceArg<"focused">;
  preview?: SingleChoiceArg<"image" | "video">;
  installOnly?: SingleBooleanChoiceArg<"installOnly">;
  _new?: SingleBooleanChoiceArg<"_new">;
  className?: string;
}

const $$ = {};

function PlasmicOmnibarAddItem__RenderFunc(props: {
  variants: PlasmicOmnibarAddItem__VariantsArgs;
  args: PlasmicOmnibarAddItem__ArgsType;
  overrides: PlasmicOmnibarAddItem__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {
          hoverText: "Install package",
        },
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
        path: "focused",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.focused,
      },
      {
        path: "preview",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.preview,
      },
      {
        path: "installOnly",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.installOnly,
      },
      {
        path: "_new",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props._new,
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
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root,
        {
          [sty.root_new]: hasVariant($state, "_new", "_new"),
          [sty.rootfocused]: hasVariant($state, "focused", "focused"),
          [sty.rootinstallOnly]: hasVariant(
            $state,
            "installOnly",
            "installOnly"
          ),
          [sty.rootinstallOnly_preview_image]:
            hasVariant($state, "installOnly", "installOnly") &&
            hasVariant($state, "preview", "image"),
          [sty.rootpreview_image]: hasVariant($state, "preview", "image"),
          [sty.rootpreview_video]: hasVariant($state, "preview", "video"),
        }
      )}
      data-plasmic-trigger-props={[triggerRootHoverProps]}
    >
      <div
        className={classNames(projectcss.all, sty.freeBox__ncMfp, {
          [sty.freeBox_new__ncMfpPk6FP]: hasVariant($state, "_new", "_new"),
          [sty.freeBoxfocused__ncMfPpJrFk]: hasVariant(
            $state,
            "focused",
            "focused"
          ),
        })}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text___2WwvC,
            {
              [sty.textfocused___2WwvCpJrFk]: hasVariant(
                $state,
                "focused",
                "focused"
              ),
            }
          )}
        >
          {"NEW"}
        </div>
      </div>
      <Stack__
        as={"div"}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox__rhXeC, {
          [sty.freeBox_new__rhXeCPk6FP]: hasVariant($state, "_new", "_new"),
          [sty.freeBoxpreview_image__rhXeCc086T]: hasVariant(
            $state,
            "preview",
            "image"
          ),
          [sty.freeBoxpreview_video__rhXeCyZaKg]: hasVariant(
            $state,
            "preview",
            "video"
          ),
        })}
      >
        <div
          className={classNames(projectcss.all, sty.freeBox__m1Yl, {
            [sty.freeBoxfocused__m1YLpJrFk]: hasVariant(
              $state,
              "focused",
              "focused"
            ),
            [sty.freeBoxpreview_image__m1Ylc086T]: hasVariant(
              $state,
              "preview",
              "image"
            ),
            [sty.freeBoxpreview_video__m1YLyZaKg]: hasVariant(
              $state,
              "preview",
              "video"
            ),
          })}
        >
          {false
            ? renderPlasmicSlot({
                defaultContents: (
                  <PlasmicImg__
                    alt={""}
                    className={classNames(sty.img__mRf6Q)}
                    displayHeight={"auto"}
                    displayMaxHeight={"100%"}
                    displayMaxWidth={"100%"}
                    displayMinHeight={"0"}
                    displayMinWidth={"0"}
                    displayWidth={"auto"}
                    src={{
                      src: image49X6ZsC5Ww5,
                      fullWidth: 300,
                      fullHeight: 150,
                      aspectRatio: 2,
                    }}
                  />
                ),

                value: args.previewNode,
              })
            : null}
          <PlasmicImg__
            data-plasmic-name={"img"}
            data-plasmic-override={overrides.img}
            alt={""}
            className={classNames(sty.img, {
              [sty.imgpreview_image]: hasVariant($state, "preview", "image"),
            })}
            displayHeight={"auto"}
            displayMaxHeight={"100%"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={"auto"}
            height={``}
            loading={"lazy"}
            src={(() => {
              try {
                return $props.previewImageUrl;
              } catch (e) {
                if (
                  e instanceof TypeError ||
                  e?.plasmicType === "PlasmicUndefinedDataError"
                ) {
                  return undefined;
                }
                throw e;
              }
            })()}
            width={``}
          />

          <Video
            data-plasmic-name={"htmlVideo"}
            data-plasmic-override={overrides.htmlVideo}
            autoPlay={true}
            className={classNames("__wab_instance", sty.htmlVideo, {
              [sty.htmlVideopreview_video]: hasVariant(
                $state,
                "preview",
                "video"
              ),
            })}
            controls={true}
            loop={true}
            muted={true}
            playsInline={true}
            src={$props.previewVideoUrl}
          />
        </div>
        <div
          data-plasmic-name={"titleBox"}
          data-plasmic-override={overrides.titleBox}
          className={classNames(projectcss.all, sty.titleBox, {
            [sty.titleBox_new]: hasVariant($state, "_new", "_new"),
            [sty.titleBoxfocused]: hasVariant($state, "focused", "focused"),
            [sty.titleBoxpreview_image]: hasVariant($state, "preview", "image"),
          })}
        >
          {renderPlasmicSlot({
            defaultContents: "Thetitleshouldwrapwhenoverflow",
            value: args.title,
            className: classNames(sty.slotTargetTitle, {
              [sty.slotTargetTitle_new]: hasVariant($state, "_new", "_new"),
              [sty.slotTargetTitlefocused]: hasVariant(
                $state,
                "focused",
                "focused"
              ),
              [sty.slotTargetTitlepreview_image]: hasVariant(
                $state,
                "preview",
                "image"
              ),
              [sty.slotTargetTitlepreview_video]: hasVariant(
                $state,
                "preview",
                "video"
              ),
            }),
          })}
        </div>
      </Stack__>
      <div
        className={classNames(projectcss.all, sty.freeBox__ssHQl, {
          [sty.freeBoxfocused__ssHQlpJrFk]: hasVariant(
            $state,
            "focused",
            "focused"
          ),
          [sty.freeBoxinstallOnly__ssHQlA84Vl]: hasVariant(
            $state,
            "installOnly",
            "installOnly"
          ),
          [sty.freeBoxinstallOnly_focused__ssHQlA84VlPJrFk]:
            hasVariant($state, "installOnly", "installOnly") &&
            hasVariant($state, "focused", "focused"),
          [sty.freeBoxinstallOnly_preview_image__ssHQlA84VlC086T]:
            hasVariant($state, "installOnly", "installOnly") &&
            hasVariant($state, "preview", "image"),
        })}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__nsmVm
          )}
        >
          <React.Fragment>
            {(() => {
              try {
                return $props.hoverText;
              } catch (e) {
                if (
                  e instanceof TypeError ||
                  e?.plasmicType === "PlasmicUndefinedDataError"
                ) {
                  return "Install package";
                }
                throw e;
              }
            })()}
          </React.Fragment>
        </div>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "img", "htmlVideo", "titleBox"],
  img: ["img"],
  htmlVideo: ["htmlVideo"],
  titleBox: ["titleBox"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  img: typeof PlasmicImg__;
  htmlVideo: typeof Video;
  titleBox: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicOmnibarAddItem__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicOmnibarAddItem__VariantsArgs;
    args?: PlasmicOmnibarAddItem__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicOmnibarAddItem__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicOmnibarAddItem__ArgsType,
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
          internalArgPropNames: PlasmicOmnibarAddItem__ArgProps,
          internalVariantPropNames: PlasmicOmnibarAddItem__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicOmnibarAddItem__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicOmnibarAddItem";
  } else {
    func.displayName = `PlasmicOmnibarAddItem.${nodeName}`;
  }
  return func;
}

export const PlasmicOmnibarAddItem = Object.assign(
  // Top-level PlasmicOmnibarAddItem renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    img: makeNodeComponent("img"),
    htmlVideo: makeNodeComponent("htmlVideo"),
    titleBox: makeNodeComponent("titleBox"),

    // Metadata about props expected for PlasmicOmnibarAddItem
    internalVariantProps: PlasmicOmnibarAddItem__VariantProps,
    internalArgProps: PlasmicOmnibarAddItem__ArgProps,
  }
);

export default PlasmicOmnibarAddItem;
/* prettier-ignore-end */
