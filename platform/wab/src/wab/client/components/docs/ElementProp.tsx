import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { TplNode } from "../../../classes";
import { toClassName } from "../../../shared/codegen/util";
import { isTplComponent, isTplTag, TplNamable } from "../../../tpls";
import { PlasmicElementProp } from "../../plasmic/plasmic_kit_docs_portal/PlasmicElementProp";
import { WithContextMenu } from "../ContextMenu";
import { createNodeIcon } from "../sidebar-tabs/tpl-tree";
import { DocsPortalCtx } from "./DocsPortalCtx";

interface ElementPropProps {
  docsCtx: DocsPortalCtx;
  node: TplNamable;
  name: string;
  isRoot: boolean;
}

const ElementProp = observer(function ElementProp(props: ElementPropProps) {
  const { docsCtx, node, name, isRoot } = props;
  const component = docsCtx.getFocusedComponent();

  const renderElementMenu = () => {
    return (
      <Menu onClick={(e) => e.domEvent.stopPropagation()}>
        {!isTplComponent(node) && (
          <Menu.Item
            onClick={() =>
              docsCtx.setComponentOverride(
                component,
                isRoot ? "onClick" : name,
                isRoot ? [] : ["props", "onClick"],
                "(e) => null",
                isRoot
              )
            }
          >
            Attach event listeners
          </Menu.Item>
        )}

        {!isTplComponent(node) && (
          <Menu.Item
            onClick={() =>
              docsCtx.setComponentOverride(
                component,
                isRoot ? "children" : name,
                isRoot ? [] : ["props", "children"],
                "null",
                isRoot
              )
            }
          >
            Override content
          </Menu.Item>
        )}

        <Menu.Item
          onClick={() =>
            docsCtx.setComponentOverride(
              component,
              name,
              ["props"],
              "{}",
              false
            )
          }
        >
          Override props
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            docsCtx.setComponentOverride(
              component,
              name,
              ["wrap"],
              "(content) => content",
              false
            )
          }
        >
          Wrap element
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            docsCtx.setComponentOverride(
              component,
              name,
              ["render"],
              "() => null",
              false
            )
          }
        >
          Replace element
        </Menu.Item>
        {!isTplComponent(node) && (
          <Menu.Item
            onClick={() =>
              docsCtx.setComponentOverride(
                component,
                name,
                ["wrapChildren"],
                '(children) => <>{children}{"new children"}</>',
                false
              )
            }
          >
            Insert additional children
          </Menu.Item>
        )}

        {!isTplComponent(node) && (
          <Menu.Item
            onClick={() =>
              docsCtx.setComponentOverride(
                component,
                name,
                ["as"],
                '"div"',
                false
              )
            }
          >
            Override element type
          </Menu.Item>
        )}
      </Menu>
    );
  };

  return (
    <WithContextMenu overlay={renderElementMenu}>
      <PlasmicElementProp
        label={name}
        icon={createNodeIcon(node)}
        onMouseEnter={() => docsCtx.setFocusedElement(node)}
        onMouseLeave={() => docsCtx.setFocusedElement(undefined)}
        addButton={{
          props: {
            tooltip: "Add override props",
            tooltipPlacement: "right",
          },

          wrap: (x) => (
            <Dropdown overlay={renderElementMenu} trigger={["click"]}>
              {x}
            </Dropdown>
          ),
        }}
        elementType={`<${getElementType(node)} />`}
      />
    </WithContextMenu>
  );
});

export default ElementProp;

function getElementType(node: TplNode) {
  if (isTplTag(node)) {
    return node.tag;
  } else if (isTplComponent(node)) {
    return toClassName(node.component.name);
  } else {
    return null;
  }
}
