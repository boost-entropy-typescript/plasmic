import { StudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { FrameSize, frameSizeGroups } from "@/wab/shared/responsiveness";
import { Menu } from "antd";
import React from "react";
import sty from "./FrameSizeMenu.module.sass";

export function makeFrameSizeMenu({
  onClick,
  studioCtx,
}: {
  onClick: (size: FrameSize) => void;
  studioCtx: StudioCtx;
}) {
  return (
    <Menu>
      {frameSizeGroups.map((group) => (
        <Menu.SubMenu
          key={group.groupName}
          title={<span>{group.groupName}</span>}
        >
          {group.sizes.map((size) => (
            <Menu.Item
              key={size.name}
              className={sty.screenSizeMenuItem}
              onClick={() => onClick(size)}
            >
              {size.name}{" "}
              <div className={sty.screenSizeDims}>
                {size.width} x {size.height}
              </div>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
      <Menu.Divider />
      <Menu.Item
        onClick={() =>
          studioCtx.switchLeftTab("responsiveness", {
            highlight: true,
          })
        }
      >
        Edit breakpoints
      </Menu.Item>
    </Menu>
  );
}
