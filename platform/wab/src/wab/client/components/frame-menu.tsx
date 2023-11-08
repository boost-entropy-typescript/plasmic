import { Menu } from "antd";
import * as React from "react";
import { Arena, ArenaFrame } from "../../classes";
import { ensure } from "../../common";
import {
  FrameViewMode,
  isComponentArena,
  isDuplicatableFrame,
  isMixedArena,
  isPageArena,
} from "../../shared/Arenas";
import {
  isBaseVariantFrame,
  isGlobalVariantFrame,
} from "../../shared/component-arenas";
import { ARENA_LOWER, FRAME_LOWER } from "../../shared/Labels";
import { isFrameWithVariantCombo } from "../../shared/Variants";
import { getComboForAction } from "../shortcuts/studio/studio-shortcuts";
import { ViewCtx } from "../studio-ctx/view-ctx";
import { MenuBuilder, MenuItemContent } from "./menu-builder";
import { reactConfirm } from "./quick-modals";

export function makeFrameMenu({
  viewCtx,
  onMenuClick,
  frame = viewCtx.arenaFrame(),
}: {
  viewCtx: ViewCtx;
  onMenuClick?: () => void;
  frame?: ArenaFrame;
}) {
  const originArena = ensure(viewCtx.studioCtx.currentArena);
  const _canCreateComponentFromFrame = !frame.container.component.name;

  const builder = new MenuBuilder();

  if (isDuplicatableFrame(originArena, frame)) {
    const onClickToDuplicate = () =>
      viewCtx.change(() => viewCtx.getViewOps().duplicate(frame));
    builder.genSection(undefined, (push) => {
      push(
        <Menu.Item
          onClick={onClickToDuplicate}
          key={`duplicate-${FRAME_LOWER}`}
        >
          <MenuItemContent shortcut={getComboForAction("DUPLICATE")}>
            Duplicate {FRAME_LOWER}
          </MenuItemContent>
        </Menu.Item>
      );
    });
  }

  if (isMixedArena(originArena)) {
    const otherArenas = viewCtx.studioCtx.site.arenas.filter(
      (it) => it.uid !== originArena?.uid && isMixedArena(it)
    );
    const onClickToMoveToArena = (destinationArena?: Arena) => () =>
      viewCtx.studioCtx.changeUnsafe(() =>
        viewCtx.studioCtx.siteOps().moveFrameToArena(frame, destinationArena)
      );
    builder.genSub(`Move to ${ARENA_LOWER}...`, (push) => {
      for (const it of otherArenas) {
        push(
          <Menu.Item key={it.uid} onClick={onClickToMoveToArena(it)}>
            <MenuItemContent>{it.name}</MenuItemContent>
          </Menu.Item>
        );
      }
      builder.genSection(undefined, (push) => {
        push(
          <Menu.Item
            onClick={onClickToMoveToArena()}
            key={`new-${ARENA_LOWER}`}
          >
            <MenuItemContent>New {ARENA_LOWER}</MenuItemContent>
          </Menu.Item>
        );
      });
    });
  }

  if (_canCreateComponentFromFrame) {
    builder.genSection(undefined, (push) => {
      if (frame.viewMode === FrameViewMode.Stretch) {
        push(
          <Menu.Item
            key="extract-page"
            onClick={() =>
              viewCtx.getViewOps().convertFrameToComponent(undefined, "page")
            }
          >
            <MenuItemContent>Convert to a Page</MenuItemContent>
          </Menu.Item>
        );
      }

      push(
        <Menu.Item
          key="extract-component"
          onClick={() =>
            viewCtx.getViewOps().convertFrameToComponent(undefined, "component")
          }
        >
          <MenuItemContent>Convert to a reusable Component</MenuItemContent>
        </Menu.Item>
      );
    });
  }

  if (!isBaseVariantFrame(viewCtx.site, frame)) {
    builder.genSection(undefined, (push) => {
      push(
        <Menu.Item
          onClick={async () => viewCtx.getViewOps().deleteFrame(frame)}
          key={`delete-${FRAME_LOWER}`}
        >
          <MenuItemContent shortcut={getComboForAction("DELETE")}>
            {isPageArena(originArena)
              ? "Delete this screen size"
              : "Delete " + FRAME_LOWER}
          </MenuItemContent>
        </Menu.Item>
      );
    });
  }

  if (isPageArena(originArena) && isGlobalVariantFrame(originArena, frame)) {
    const globalVariant = frame.targetGlobalVariants[0];
    builder.genSection(undefined, (push) => {
      push(
        <Menu.Item
          onClick={async () => {
            const response = await reactConfirm({
              title: "Delete " + FRAME_LOWER,
              message: (
                <>
                  This will clear all overrides for this variant in the current
                  page. Would you like to proceed?
                </>
              ),
            });
            if (response) {
              await viewCtx.studioCtx.change(({ success }) => {
                viewCtx.studioCtx
                  .siteOps()
                  .removePageArenaVariant(originArena, globalVariant);
                return success();
              });
            }
          }}
          key={`delete-global-variant-artboard`}
        >
          <MenuItemContent>
            Delete {FRAME_LOWER} for <strong>{globalVariant.name}</strong>
          </MenuItemContent>
        </Menu.Item>
      );
    });
  }

  if (
    isComponentArena(originArena) &&
    isFrameWithVariantCombo({ site: viewCtx.site, frame })
  ) {
    builder.genSection(undefined, (push) => {
      push(
        <Menu.Item
          onClick={() =>
            viewCtx.change(() =>
              viewCtx.getViewOps().clearFrameComboSettings(frame)
            )
          }
          key={`clear-${FRAME_LOWER}`}
        >
          <MenuItemContent>Clear settings for this combo</MenuItemContent>
        </Menu.Item>
      );
    });
  }

  return builder.build({ onMenuClick, menuName: "frame-menu" });
}
