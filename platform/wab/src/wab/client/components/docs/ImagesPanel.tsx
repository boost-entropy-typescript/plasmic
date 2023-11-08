import { Alert } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { ImageAssetType } from "../../../image-asset-type";
import {
  DefaultImagesPanelProps,
  PlasmicImagesPanel,
} from "../../plasmic/plasmic_kit_docs_portal/PlasmicImagesPanel";
import { Matcher } from "../view-common";
import { useDocsPortalCtx } from "./DocsPortalCtx";
import ImageListItem from "./ImageListItem";

interface ImagesPanelProps extends DefaultImagesPanelProps {}

const ImagesPanel = observer(function ImagesPanel(props: ImagesPanelProps) {
  const docsCtx = useDocsPortalCtx();
  const [query, setQuery] = React.useState("");
  const matcher = new Matcher(query);
  const icons = docsCtx.studioCtx.site.imageAssets.filter(
    (value) =>
      value.type === ImageAssetType.Icon &&
      !!value.dataUri &&
      matcher.matches(value.name)
  );

  return (
    <PlasmicImagesPanel
      {...props}
      searchbox={{
        value: query,
        onChange: (e) => setQuery(e.target.value),
        autoFocus: true,
      }}
    >
      <>
        {icons.map((icon) => (
          <ImageListItem key={icon.uid} icon={icon} docsCtx={docsCtx} />
        ))}

        {icons.length === 0 && (
          <Alert
            className="m-m"
            style={{ width: "100%" }}
            type="warning"
            showIcon
            message="No icons."
          />
        )}
      </>
    </PlasmicImagesPanel>
  );
});

export default ImagesPanel;
