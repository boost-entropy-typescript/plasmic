import { observer } from "mobx-react-lite";
import * as React from "react";
import { useLocalStorage } from "react-use";
import { lengthCssUnits } from "../../../css";
import { makeAssetClassName } from "../../../shared/codegen/image-assets";
import {
  DefaultIconTogglesPanelProps,
  PlasmicIconTogglesPanel,
} from "../../plasmic/plasmic_kit_docs_portal/PlasmicIconTogglesPanel";
import { SidebarModalProvider } from "../sidebar/SidebarModal";
import { ColorButton } from "../style-controls/ColorButton";
import DimTokenSpinner from "../widgets/DimTokenSelector";
import Textbox from "../widgets/Textbox";
import { useDocsPortalCtx } from "./DocsPortalCtx";

interface IconTogglesPanelProps extends DefaultIconTogglesPanelProps {}

const IconTogglesPanel = observer(function IconTogglesPanel(
  props: IconTogglesPanelProps
) {
  const docsCtx = useDocsPortalCtx();
  const icon = docsCtx.tryGetFocusedIcon();

  const [dismissed, setDismissed] = useLocalStorage(
    "IconTogglesPanel--dismissIconInfo",
    false
  );

  if (!icon) {
    return null;
  }

  return (
    <PlasmicIconTogglesPanel
      {...props}
      explanation={{
        defaultExpanded: !dismissed,
        children: <IconTogglesInfo />,
        onToggle: (expanded) => {
          if (!expanded && !dismissed) {
            setDismissed(true);
          }
        },
      }}
      header={makeAssetClassName(icon)}
      title={{
        children: (
          <Textbox
            styleType={"bordered"}
            value={docsCtx.getIconToggle(icon, "title")}
            onChange={(e) =>
              docsCtx.setIconToggle(icon, "title", e.target.value || undefined)
            }
            placeholder="Unset"
          />
        ),
      }}
      color={{
        primaryAnnotation: (
          <SidebarModalProvider>
            <ColorButton
              onChange={(val) => docsCtx.setIconToggle(icon, "color", val)}
              sc={docsCtx.studioCtx}
              color={docsCtx.getIconToggle(icon, "color")}
            />
          </SidebarModalProvider>
        ),
      }}
      width={{
        children: (
          <DimTokenSpinner
            min={1}
            value={docsCtx.getIconToggle(icon, "width") || ""}
            onChange={(v) => docsCtx.setIconToggle(icon, "width", v)}
            allowedUnits={lengthCssUnits}
            styleType={["bordered"]}
            placeholder="Unset"
          />
        ),
      }}
      height={{
        children: (
          <DimTokenSpinner
            min={1}
            value={docsCtx.getIconToggle(icon, "height") || ""}
            onChange={(v) => docsCtx.setIconToggle(icon, "height", v)}
            allowedUnits={lengthCssUnits}
            styleType={["bordered"]}
            placeholder="Unset"
          />
        ),
      }}
      resetButton={{
        onClick: () => docsCtx.resetIconToggles(icon),
      }}
    />
  );
});

export default IconTogglesPanel;

function IconTogglesInfo() {
  return (
    <div>
      Each SVG icon added to Plasmic can be used as a React component. Each
      component takes in the usual props you can pass into an <code>svg</code>{" "}
      element. By default, its size is <code>1em</code>.
    </div>
  );
}
