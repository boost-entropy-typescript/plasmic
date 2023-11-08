/** @format */
import { U } from "@/wab/client/cli-routes";
import { useContextMenu } from "@/wab/client/components/ContextMenu";
import { usePreviewCtx } from "@/wab/client/components/live/PreviewCtx";
import {
  MenuBuilder,
  TextAndShortcut,
} from "@/wab/client/components/menu-builder";
import { PublicLink } from "@/wab/client/components/PublicLink";
import { reactAlert, reactConfirm } from "@/wab/client/components/quick-modals";
import { AvatarGallery } from "@/wab/client/components/studio/Avatar";
import { Icon } from "@/wab/client/components/widgets/Icon";
import Select from "@/wab/client/components/widgets/Select";
import { useAppCtx, useTopFrameApi } from "@/wab/client/contexts/AppContexts";
import ComponentIcon from "@/wab/client/plasmic/plasmic_kit/PlasmicIcon__Component";
import PageIcon from "@/wab/client/plasmic/plasmic_kit_design_system/icons/PlasmicIcon__Page";
import PlasmicTopBar from "@/wab/client/plasmic/plasmic_kit_top_bar/PlasmicTopBar";
import { getComboForAction } from "@/wab/client/shortcuts/studio/studio-shortcuts";
import { useStudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { STUDIO_ONBOARDING_TUTORIALS_LIST } from "@/wab/client/tours/tutorials/tutorials-meta";
import { ensure, sortBy, spawn, withoutNils } from "@/wab/common";
import {
  isCodeComponent,
  isFrameComponent,
  isPageComponent,
  isReusableComponent,
} from "@/wab/components";
import { DEVFLAGS } from "@/wab/devflags";
import { isCoreTeamEmail } from "@/wab/shared/devflag-utils";
import { Menu, notification, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { pruneUnusedImageAssets } from "src/wab/shared/prune-site";
import { fixPageHrefsToLocal } from "src/wab/shared/utils/split-site-utils";

export const outlineModes = ["blocks", "inlines", "all"];

interface TopBarProps {
  preview?: boolean;
}

function _TopBar({ preview }: TopBarProps) {
  const studioCtx = useStudioCtx();
  const appCtx = useAppCtx();
  const previewCtx = usePreviewCtx();
  const topFrameApi = useTopFrameApi();
  const projectId = studioCtx.siteInfo.id;
  const team = appCtx
    .getAllTeams()
    .find((t) => t.id === studioCtx.siteInfo.teamId);
  const isWhiteLabelUser = appCtx.isWhiteLabelUser();
  const isObserver = appCtx.selfInfo?.isObserver;

  const menu = () => {
    const builder = new MenuBuilder();
    builder.genSection(undefined, (push) => {
      builder.genSection(undefined, (push2) => {
        if (studioCtx.canEditProject()) {
          push2(
            <Menu.Item
              key="rename"
              onClick={() => topFrameApi.setShowProjectNameModal(true)}
            >
              Rename project
            </Menu.Item>
          );
        }

        if (!isWhiteLabelUser) {
          push2(
            <Menu.Item
              key="duplicate"
              onClick={() => topFrameApi.setShowCloneProjectModal(true)}
            >
              Duplicate project
            </Menu.Item>
          );
        }
      });

      if (studioCtx.canEditProject() && !studioCtx.contentEditorMode) {
        builder.genSection("Configuration", (push2) => {
          push2(
            <Menu.Item
              key="configure"
              data-test-id="configure-project"
              onClick={() => {
                spawn(topFrameApi.setShowHostModal(true));
              }}
            >
              Configure custom app host
            </Menu.Item>
          );

          if (appCtx.appConfig.appAuth && !isWhiteLabelUser) {
            push2(
              <Menu.Item
                key="app-auth"
                onClick={() => {
                  spawn(topFrameApi.setShowAppAuthModal(true));
                }}
              >
                Configure app authentication
              </Menu.Item>
            );
          }

          if (!isWhiteLabelUser) {
            push2(
              <Menu.Item
                key="localization"
                onClick={() => {
                  spawn(topFrameApi.setShowLocalizationModal(true));
                }}
              >
                {studioCtx.site.flags.usePlasmicTranslation
                  ? "Disable"
                  : "Enable"}{" "}
                localization framework integration
              </Menu.Item>
            );
          }

          if (
            appCtx.appConfig.secretApiTokenTeams?.includes(
              studioCtx.siteInfo.teamId ?? ""
            )
          ) {
            push2(
              <Menu.Item
                key="secret"
                onClick={async () => {
                  if (
                    !(await reactConfirm({
                      message:
                        "Generate new secret API token? (This will invalidate any existing secret token.) This is only needed for the Write API.",
                    }))
                  ) {
                    return;
                  }
                  const response = await appCtx.api.setSiteInfo(
                    studioCtx.siteInfo.id,
                    {}
                  );
                  if (response.paywall === "pass") {
                    const { regeneratedSecretApiToken } = response.response;
                    await reactAlert({
                      message: (
                        <>
                          <p>
                            New secret API token for this project (will not be
                            shown again):
                          </p>
                          <pre>{regeneratedSecretApiToken}</pre>
                        </>
                      ),
                    });
                  }
                }}
              >
                Regenerate secret project API token
              </Menu.Item>
            );
          }
        });

        const isPlasmicAdmin = isCoreTeamEmail(
          appCtx.selfInfo?.email,
          appCtx.appConfig
        );
        if (isPlasmicAdmin || appCtx.appConfig.debug) {
          builder.genSection("Debug", (push2) => {
            builder.genSub("Optimization", (push3) => {
              push3(
                <Menu.Item
                  key="cleanup"
                  onClick={() => {
                    spawn(
                      studioCtx.change(({ success }) => {
                        studioCtx.tplMgr().cleanRedundantOverrides();
                        return success();
                      })
                    );
                    notification.info({
                      message: `Redundant overrides have been cleaned. You can run this again every time you want to clean them.`,
                    });
                  }}
                >
                  Remove redundant overrides
                </Menu.Item>
              );
              push3(
                <Menu.Item
                  key="prune-images"
                  onClick={async () => {
                    spawn(
                      studioCtx.change(({ success }) => {
                        const pruned = pruneUnusedImageAssets(studioCtx.site);
                        notification.success({
                          message: `Pruned ${pruned.size} assets`,
                        });
                        return success();
                      })
                    );
                  }}
                >
                  Remove unused image assets
                </Menu.Item>
              );
              push3(
                <Menu.Item
                  key="cleanup-invisible"
                  onClick={async () => {
                    spawn(
                      studioCtx.change(({ success }) => {
                        const result = studioCtx
                          .tplMgr()
                          .lintElementVisibilities({
                            performUpdates: true,
                          });

                        console.log(result);

                        notification.success({
                          message: `Fixed ${Object.keys(
                            result.total
                          )} invisible elements in ${
                            Object.keys(result.changesByComponent).length
                          }`,
                        });
                        return success();
                      })
                    );
                  }}
                >
                  Lint and fix invisible elements
                </Menu.Item>
              );
            });
            if (isPlasmicAdmin) {
              push2(
                <Menu.Item
                  key="admin-mode"
                  onClick={() => {
                    spawn(
                      topFrameApi.toggleAdminMode(
                        !appCtx.selfInfo?.adminModeDisabled
                      )
                    );
                  }}
                >
                  <strong>
                    {appCtx.selfInfo!.adminModeDisabled ? "Enable" : "Disable"}
                  </strong>{" "}
                  admin mode
                </Menu.Item>
              );

              push2(
                <Menu.SubMenu
                  title={
                    <span>
                      <strong>Start</strong> onboarding tour
                    </span>
                  }
                >
                  {STUDIO_ONBOARDING_TUTORIALS_LIST.map((tour) => {
                    return (
                      <Menu.Item
                        key={tour}
                        onClick={() => {
                          studioCtx.setOnboardingTourState({
                            run: true,
                            stepIndex: 0,
                            tour,
                            flags: {},
                            results: {},
                            triggers: [],
                          });
                        }}
                      >
                        {tour}
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );

              builder.genSub("Site-splitting utils", (push3) => {
                push3(
                  <Menu.Item
                    key="fix-page-hrefs-to-local"
                    onClick={async () =>
                      studioCtx.changeUnsafe(() => {
                        fixPageHrefsToLocal(studioCtx.site);
                      })
                    }
                  >
                    Convert page hrefs to local pages
                  </Menu.Item>
                );
              });
            }
          });
        }
      }
    });

    return builder.build({
      menuName: "project-menu",
    });
  };

  const contextMenuProps = useContextMenu({ menu });
  const uiConfig = studioCtx.getCurrentUiConfig();

  const brand =
    uiConfig.brand ??
    appCtx.appConfig.brands?.[studioCtx.siteInfo.teamId ?? ""] ??
    appCtx.appConfig.brands?.[""];

  const previewPages = previewCtx.studioCtx.site.components.filter((c) =>
    isPageComponent(c)
  );
  const previewComponents = previewCtx.studioCtx.site.components.filter(
    (c) => isReusableComponent(c) && !isCodeComponent(c)
  );
  const previewArtboards = previewCtx.studioCtx.site.components.filter((c) =>
    isFrameComponent(c)
  );

  return (
    <>
      <PlasmicTopBar
        root={
          isObserver
            ? {
                className: "topbar--isObserver",
              }
            : undefined
        }
        mode={preview ? "preview" : undefined}
        hideAvatar
        freeTrial={{
          team,
        }}
        logoLink={{
          render: (props) => (
            <Tooltip title={brand.logoTooltip ?? "Back to dashboard"}>
              <PublicLink {...props} href={brand.logoHref ?? U.dashboard({})}>
                {brand.logoImgSrc ? (
                  <img src={brand.logoImgSrc} style={{ maxHeight: 40 }} />
                ) : (
                  props.children
                )}
              </PublicLink>
            </Tooltip>
          ),
        }}
        projectTitle={{
          onClick: () => {
            if (studioCtx.canEditProject()) {
              spawn(topFrameApi.setShowProjectNameModal(true));
            }
          },
          children: studioCtx.siteInfo.name,
        }}
        projectMenu={{
          props: { ...contextMenuProps, "data-test-id": "project-menu-btn" },
          wrap: (n) => (studioCtx.canEditProject() ? n : null),
        }}
        saveIndicator={{
          wrap: (n) => (studioCtx.canEditProject() ? n : null),
        }}
        arenaSwitcher={{
          wrap: (n) => (studioCtx.appCtx.appConfig.projPanelTop ? n : null),
        }}
        branchSeparator={{
          wrap: (n) => (studioCtx.showBranching() ? n : null),
        }}
        branchSegment={{
          wrap: (n) => (studioCtx.showBranching() ? n : null),
        }}
        publishButton={{
          props: {
            enable:
              appCtx.appConfig.continuousDeployment &&
              studioCtx.canEditProject(),
          },
        }}
        avatar={{
          render: () => (
            <AvatarGallery users={withoutNils([appCtx.selfInfo])} />
          ),
        }}
        play={{
          onClick: () => {
            void studioCtx.changeUnsafe(() => studioCtx.toggleDevControls());
          },
          tooltip: (
            <TextAndShortcut
              shortcut={getComboForAction("TOGGLE_PREVIEW_MODE")}
            >
              Preview the current artboard
            </TextAndShortcut>
          ),
          disabled: !studioCtx.currentArena || studioCtx.currentArenaEmpty,
          ...{ "data-test-id": "enter-live-mode-btn" },
        }}
        stop={{
          onClick: () => {
            void studioCtx.changeUnsafe(() => studioCtx.toggleDevControls());
          },
          tooltip: (
            <TextAndShortcut shortcut={"esc"}>
              Go back to edit mode
            </TextAndShortcut>
          ),

          ...{ "data-test-id": "exit-live-mode-btn" },
        }}
        codeButton={
          studioCtx.contentEditorMode || isWhiteLabelUser
            ? {
                render: () => null,
              }
            : {}
        }
        zoomButton={{}}
        viewButton={{}}
        shareButton={
          isWhiteLabelUser
            ? {
                render: () => null,
              }
            : {}
        }
        commentButton={{
          wrap: DEVFLAGS.comments ? undefined : () => null,
          props: {
            active: studioCtx.showCommentsPanel,
            onClick: () => studioCtx.toggleCommentsPanel(),
          },
        }}
        // TODO: We are currently not showing the live popout button on
        // preview mode. That will require abstracting LivePreview out of
        // it, so that when it is unmounted and mounted again (on route change)
        // things continue working.
        livePopOutButton={preview ? { wrap: () => null } : undefined}
        previewSelect={
          preview
            ? {
                "aria-label": "Select component",
                children: (
                  <>
                    {previewPages.length > 0 && (
                      <Select.OptionGroup title="Pages">
                        {sortBy(previewPages, (c) => c.name.toLowerCase()).map(
                          (c) => (
                            <Select.Option key={c.uuid} value={c.uuid}>
                              <Icon
                                icon={PageIcon}
                                style={{ marginRight: 4 }}
                              />
                              {c.name}{" "}
                              <span style={{ fontSize: "0.9em", opacity: 0.7 }}>
                                (
                                {
                                  ensure(
                                    c.pageMeta,
                                    "Page component is expected to have page meta"
                                  ).path
                                }
                                )
                              </span>
                            </Select.Option>
                          )
                        )}
                      </Select.OptionGroup>
                    )}
                    {previewComponents.length > 0 && (
                      <Select.OptionGroup title="Components">
                        {sortBy(previewComponents, (c) =>
                          c.name.toLowerCase()
                        ).map((c) => (
                          <Select.Option key={c.uuid} value={c.uuid}>
                            <Icon
                              icon={ComponentIcon}
                              style={{ marginRight: 4 }}
                            />
                            {c.name}
                          </Select.Option>
                        ))}
                      </Select.OptionGroup>
                    )}
                    {previewArtboards.length > 0 && (
                      <Select.OptionGroup title="Artboards">
                        {previewArtboards.map((c) => (
                          <Select.Option key={c.uuid} value={c.uuid}>
                            {c.name || "Unnamed artboard"}
                          </Select.Option>
                        ))}
                      </Select.OptionGroup>
                    )}
                  </>
                ),
                value: previewCtx.component?.uuid,
                onChange: (uuid) => {
                  const component = ensure(
                    previewCtx.studioCtx.site.components.find(
                      (c) => c.uuid == uuid
                    ),
                    "Could not find component with selected UUID"
                  );
                  void previewCtx.pushComponent(component);
                },
              }
            : null
        }
        variantsComboSelect={{}}
        plasmicAdminMode={
          isCoreTeamEmail(appCtx.selfInfo?.email, appCtx.appConfig) &&
          appCtx.selfInfo?.adminModeDisabled
        }
      />
    </>
  );
}

export const TopBar = observer(_TopBar);
