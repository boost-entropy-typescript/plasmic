import { Alert } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  isCodeComponent,
  isFrameComponent,
  isSubComponent,
} from "../../../components";
import {
  DefaultComponentsPanelProps,
  PlasmicComponentsPanel,
} from "../../plasmic/plasmic_kit_docs_portal/PlasmicComponentsPanel";
import { Matcher } from "../view-common";
import ComponentListItem from "./ComponentListItem";
import { useDocsPortalCtx } from "./DocsPortalCtx";

interface ComponentsPanelProps extends DefaultComponentsPanelProps {}

const ComponentsPanel = observer(function ComponentsPanel(
  props: ComponentsPanelProps
) {
  const docsCtx = useDocsPortalCtx();
  const [query, setQuery] = React.useState("");
  const matcher = new Matcher(query);
  const components = docsCtx.studioCtx.site.components.filter(
    (c) =>
      !isFrameComponent(c) &&
      !isCodeComponent(c) &&
      !isSubComponent(c) &&
      matcher.matches(c.name)
  );

  return (
    <PlasmicComponentsPanel
      {...props}
      searchbox={{
        value: query,
        onChange: (e) => setQuery(e.target.value),
        autoFocus: true,
      }}
    >
      <>
        {components.map((comp) => (
          <ComponentListItem
            key={comp.uid}
            component={comp}
            docsCtx={docsCtx}
          />
        ))}

        {components.length === 0 && (
          <Alert
            className="m-m"
            style={{ width: "100%" }}
            type="warning"
            showIcon
            message="No components."
          />
        )}
      </>
    </PlasmicComponentsPanel>
  );
});

export default ComponentsPanel;
