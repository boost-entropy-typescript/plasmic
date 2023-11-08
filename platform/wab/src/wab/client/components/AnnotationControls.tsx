import { Collapse } from "antd";
import React, { useState } from "react";
import { ensure, zeroWidthSpace } from "../../common";
import {
  addAnnotation,
  Annotation,
  getAnnotations,
} from "../../shared/Annotations";
import { useViewCtx } from "../contexts/StudioContexts";
import { PanelSection } from "./sidebar/PanelSection";
import { ListBox, ListBoxItem } from "./widgets";
import { EditableLabel } from "./widgets/EditableLabel";

export function AnnotationControls() {
  const vc = useViewCtx();
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  const tpl = ensure(vc.focusedTpl(true));

  return (
    <PanelSection title={"Annotations"}>
      <ListBox
        appendPrepend={"append"}
        onAdd={() =>
          vc.change(() => {
            const annot = new Annotation("Unnamed", "Enter some content");
            addAnnotation(tpl, annot);
            setExpanded(annot.id);
          })
        }
        addText={"Add annotation"}
      >
        {getAnnotations(tpl).map((annot, i) => (
          <ListBoxItem
            mainContent={
              <Collapse
                className={"mini-collapse"}
                activeKey={expanded}
                onChange={([key]) => setExpanded(key ? annot.id : undefined)}
              >
                <Collapse.Panel
                  showArrow={false}
                  key={annot.id}
                  header={
                    <EditableLabel
                      value={annot.name}
                      onEdit={(value) => vc.change(() => (annot.name = value))}
                    />
                  }
                >
                  <div style={{ marginTop: 4 }}>
                    <EditableLabel
                      value={annot.value || zeroWidthSpace}
                      onEdit={(value) => vc.change(() => (annot.value = value))}
                      labelFactory={(props) => <div {...props} />}
                      inputBoxFactory={(props) => (
                        <textarea
                          {...(props as React.ComponentProps<"textarea">)}
                        />
                      )}
                    />
                  </div>
                </Collapse.Panel>
              </Collapse>
            }
            index={i}
          />
        ))}
      </ListBox>
    </PanelSection>
  );
}
