import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { Menu, Popover } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Editor, Range, Text } from "slate";
import { spawn } from "../../../../common";
import StrikeIcon from "../../../plasmic/plasmic_kit/PlasmicIcon__Strike";
import {
  DefaultRichTextToolbarProps,
  PlasmicRichTextToolbar,
} from "../../../plasmic/plasmic_kit_rich_text_toolbar/PlasmicRichTextToolbar";
import CodesvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__Codesvg";
import HeadingsvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__Headingsvg";
import LinksvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__Linksvg";
import OrderedListsvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__OrderedListsvg";
import TextsvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__Textsvg";
import UnderlinesvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__Underlinesvg";
import UnorderedListsvgIcon from "../../../plasmic/q_4_icons/icons/PlasmicIcon__UnorderedListsvg";
import { useStudioCtx } from "../../../studio-ctx/StudioCtx";
import { EditingTextContext } from "../../../studio-ctx/view-ctx";
import { fontWeightOptions } from "../../../typography-utils";
import Button from "../../widgets/Button";
import { ColorPicker } from "../../widgets/ColorPicker";
import { Icon } from "../../widgets/Icon";
import Select from "../../widgets/Select";
import { CustomCssProps } from "../CanvasText";
import { TplTagElement } from "../slate";
import { tags } from "../subdeps";

type BlockElement = {
  tag: typeof tags[number];
  icon: (props: any) => JSX.Element;
  label: string;
};

const blocks: BlockElement[] = [
  {
    tag: "h1",
    icon: HeadingsvgIcon,
    label: "Heading 1",
  },
  {
    tag: "h2",
    icon: HeadingsvgIcon,
    label: "Heading 2",
  },
  {
    tag: "h3",
    icon: HeadingsvgIcon,
    label: "Heading 3",
  },
  {
    tag: "h4",
    icon: HeadingsvgIcon,
    label: "Heading 4",
  },
  {
    tag: "h5",
    icon: HeadingsvgIcon,
    label: "Heading 5",
  },
  {
    tag: "h6",
    icon: HeadingsvgIcon,
    label: "Heading 6",
  },
  {
    tag: "ul",
    icon: UnorderedListsvgIcon,
    label: "Bulleted list",
  },
  {
    tag: "ol",
    icon: OrderedListsvgIcon,
    label: "Numbered list",
  },
  {
    tag: "blockquote",
    icon: TextsvgIcon,
    label: "Blockquote",
  },
  {
    tag: "pre",
    icon: CodesvgIcon,
    label: "Code",
  },
];

interface RichTextToolbarProps extends DefaultRichTextToolbarProps {
  ctx: EditingTextContext;
}

function RichTextToolbar_(
  { ctx, ...props }: RichTextToolbarProps,
  ref: HTMLElementRefOf<"div">
) {
  // This is just a wrapper to use the run() function from
  // viewCtx.editingTextContext() with no need to check if it's undefined.
  const runInEditor = (action: string, params?: any) => {
    if (ctx.run) {
      spawn(ctx.run(action, params));
    }
  };

  const markCss = (cssProps: React.CSSProperties, toggle: boolean = true) => {
    runInEditor("CUSTOM_CSS", { props: cssProps, toggle } as CustomCssProps);
  };

  // Current marks (i.e. CSS props applied to current selection).
  const [marks, setMarks] = React.useState<Omit<Text, "text">>({});

  // Current block tag (e.g. "h1", "ul" or undefined for no block).
  const [block, setBlock] =
    React.useState<typeof tags[number] | undefined>(undefined);

  const studioCtx = useStudioCtx();

  // TODO: We default color to black, but maybe we could default it to the
  // effective color of the current TplText.
  const currentColor = marks?.color || "#000000";

  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);

  React.useEffect(() => {
    const { editor } = ctx;
    if (!editor) {
      return;
    }

    // If the color picker is visible and the selection is collapsed, then
    // hide the color picker. We check if selection is collapsed because
    // otherwise we would hide the color picker when a color is picked,
    // because adding marks to an unmarked text changes the selection path.
    if (
      colorPickerVisible &&
      editor.selection &&
      Range.isCollapsed(editor.selection)
    ) {
      setColorPickerVisible(false);
    }

    // Update current block.
    const blockElement = Editor.above(editor, {
      match: (n) =>
        Editor.isBlock(editor, n) && n.type === "TplTag" && n.tag !== "li",
    })?.[0] as TplTagElement | undefined;
    setBlock(blockElement?.tag);

    // Update marks (CSS props in current selection).
    setMarks(Editor.marks(editor) || {});
  }, [ctx.editor]);

  return (
    <PlasmicRichTextToolbar
      {...props}
      root={{ ref }}
      style={{
        position: "absolute",
        top: studioCtx.focusedMode ? 60 : 12,
      }}
      block={{
        props: {
          "aria-label": "Block type",
          children: [
            ...blocks.map((b) => (
              <Select.Option
                key={b.tag}
                value={b.tag}
                aria-label={b.label}
                textValue={b.label}
              >
                <Icon icon={b.icon} style={{ marginRight: 4 }} /> {b.label}
              </Select.Option>
            )),
            <Select.Option key={null} value={null} textValue={"Default"}>
              <Icon icon={TextsvgIcon} style={{ marginRight: 4 }} />
              Default
            </Select.Option>,
          ],
          onChange: (tag) => runInEditor("WRAP_BLOCK", tag),
          value: block || null,
        },
      }}
      currentColor={{
        style: {
          background: currentColor,
        },
      }}
      color={{
        wrap: (node) => (
          <Popover
            visible={colorPickerVisible}
            onVisibleChange={(visible) => {
              setColorPickerVisible(visible);
              markCss({ color: currentColor }, false);
            }}
            transitionName=""
            content={() =>
              colorPickerVisible && (
                <div style={{ width: 250 }}>
                  <ColorPicker
                    color={currentColor}
                    // TODO: We do not support tokens in StyleMarkers at the
                    // moment.
                    hideTokenPicker={true}
                    onChange={(color: string) => {
                      const { editor } = ctx;
                      const oldColor = (editor ? Editor.marks(editor) : {})
                        ?.color;
                      if (oldColor !== color) {
                        markCss({ color }, false);
                      }
                    }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Button
                      onClick={() => {
                        markCss({ color: undefined });
                        setColorPickerVisible(false);
                      }}
                    >
                      Unset color
                    </Button>
                  </div>
                </div>
              )
            }
            trigger="click"
          >
            {node}
          </Popover>
        ),
      }}
      fontWeight={{
        props: {
          // TODO: Make button active if selection is bold according to marks.
          "aria-label": "Bold",
          onClick: () => runInEditor("BOLD"),
          menu: () => (
            <Menu>
              {fontWeightOptions.map((option) => (
                <Menu.Item
                  aria-label={option.label}
                  key={option.value}
                  onClick={() =>
                    markCss({ fontWeight: `${option.value}` as any })
                  }
                >
                  {option.value} - {option.label}
                </Menu.Item>
              ))}
              <Menu.Item
                aria-label="Unset"
                onClick={() => markCss({ fontWeight: undefined })}
              >
                Unset
              </Menu.Item>
            </Menu>
          ),
        },
      }}
      fontStyle={{
        // TODO: Make button active if selection is italic according to marks.
        props: {
          onClick: () => runInEditor("ITALIC"),
        },
      }}
      textDecoration={{
        // TODO: Make button active if selection has text-decoration according
        // to marks.
        props: {
          "aria-label": "Underline",
          onClick: () => runInEditor("UNDERLINE"),
          menu: () => (
            <Menu>
              <Menu.Item
                aria-label="Underline"
                onClick={() => runInEditor("UNDERLINE")}
              >
                <Icon icon={UnderlinesvgIcon} /> Underline
              </Menu.Item>
              <Menu.Item
                aria-label="Strikethrough"
                onClick={() => runInEditor("STRIKETHROUGH")}
              >
                <Icon icon={StrikeIcon} /> Strikethrough
              </Menu.Item>
              <Menu.Item
                aria-label="Unset"
                onClick={() => markCss({ textDecorationLine: undefined })}
              >
                Unset
              </Menu.Item>
            </Menu>
          ),
        },
      }}
      inline={{
        // TODO: Make button active if selection has link, code or span.
        props: {
          "aria-label": "Link",
          onClick: () => runInEditor("LINK"),
          menu: () => (
            <Menu>
              <Menu.Item aria-label="Link" onClick={() => runInEditor("LINK")}>
                <Icon icon={LinksvgIcon} style={{ marginRight: 4 }} />
                Link
              </Menu.Item>
              <Menu.Item
                aria-label="Inline code"
                onClick={() => runInEditor("CODE")}
              >
                <Icon icon={CodesvgIcon} style={{ marginRight: 4 }} />
                Inline code
              </Menu.Item>
              <Menu.Item
                aria-label="Span element"
                onClick={() => runInEditor("SPAN")}
              >
                <Icon icon={TextsvgIcon} style={{ marginRight: 4 }} />
                Span element
              </Menu.Item>
            </Menu>
          ),
        },
      }}
    />
  );
}

const RichTextToolbar = observer(RichTextToolbar_, { forwardRef: true });
export default RichTextToolbar;
