import {
  getPlumeComponentTemplates,
  getPlumeImage,
} from "@/wab/client/components/plume/plume-display-utils";
import {
  buildInsertableExtraInfo,
  getInsertableTemplateComponentItem,
  getScreenVariantToInsertableTemplate,
} from "@/wab/client/insertable-templates";
import PlumeMarkIcon from "@/wab/client/plasmic/plasmic_kit_design_system/icons/PlasmicIcon__PlumeMark";
import {
  DefaultNewComponentModalProps,
  PlasmicNewComponentModal,
} from "@/wab/client/plasmic/plasmic_kit_new_component/PlasmicNewComponentModal";
import { StudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { assert, ensure } from "@/wab/common";
import { flattenInsertableTemplatesByType } from "@/wab/devflags";
import { InsertableTemplateExtraInfo } from "@/wab/shared/insertable-templates";
import { getPlumeEditorPluginByType } from "@/wab/shared/plume/plume-registry";
import { Tooltip } from "antd";
import * as React from "react";
import { Icon } from "./Icon";
import NewComponentItem from "./NewComponentItem";
import NewComponentSection from "./NewComponentSection";
import { TextboxRef } from "./Textbox";

export type NewComponentInfo = {
  name: string;
  plumeTemplateId?: string;
  insertableTemplateInfo?: InsertableTemplateExtraInfo;
};

interface NewComponentModalProps
  extends Omit<DefaultNewComponentModalProps, "children"> {
  onSubmit: (info: NewComponentInfo) => void;
  onCancel: () => void;
  studioCtx: StudioCtx;
}

function NewComponentModal(props: NewComponentModalProps) {
  const { onSubmit, onCancel, studioCtx, ...rest } = props;

  const [expanded, setExpanded] = React.useState(false);
  const [templateId, setTemplateId] = React.useState<string | undefined>(
    undefined
  );
  const [name, setName] = React.useState("");
  const nameRef = React.useRef<TextboxRef>(null);

  const plumeSite = studioCtx.projectDependencyManager.plumeSite;
  const plumeTemplates = getPlumeComponentTemplates(studioCtx);
  const otherTemplates = flattenInsertableTemplatesByType(
    studioCtx.appCtx.appConfig.insertableTemplates,
    "insertable-templates-component"
  );

  return (
    <PlasmicNewComponentModal
      root={{
        as: "form",
        props: {
          onSubmit: async (e: Event) => {
            e.preventDefault();
            if (name) {
              if (templateId?.startsWith("template:")) {
                const templateName = templateId.split(":")[1];
                const templateItem = getInsertableTemplateComponentItem(
                  studioCtx,
                  templateName
                );
                assert(templateItem, `No template found for ${templateName}`);
                const { screenVariant } =
                  await getScreenVariantToInsertableTemplate(studioCtx);
                const templateInfo = await buildInsertableExtraInfo(
                  studioCtx,
                  templateItem.projectId,
                  templateItem.componentName,
                  screenVariant
                );
                onSubmit({ name, insertableTemplateInfo: templateInfo });
              } else if (templateId) {
                onSubmit({ name, plumeTemplateId: templateId });
              } else {
                onSubmit({ name });
              }
            }
          },
          style: {
            maxHeight: "calc(100vh - 64px)",
          },
        },
      }}
      cancelButton={{
        onClick: onCancel,
        htmlType: "button",
      }}
      nameInput={{
        props: {
          autoFocus: true,
          "data-test-id": "prompt",
          ref: nameRef,
          value: name,
          onChange: (e) => setName(e.target.value),
        },
      }}
      submitButton={{
        props: {
          "data-test-id": "prompt-submit",
          htmlType: "submit",
          disabled: !name,
        },
      }}
      showTemplates={expanded}
      expander={{
        onClick: () => setExpanded(!expanded),
        type: "button",
      }}
      {...rest}
    >
      <NewComponentSection>
        <NewComponentItem
          isSelected={templateId == null}
          title="Blank component"
          onClick={() => {
            const previousName = plumeTemplates.find(
              (c) => c.uuid === templateId
            )?.name;
            setTemplateId(undefined);
            if (previousName === name) {
              setName("");
            }
            if (nameRef.current) {
              nameRef.current.focus();
            }
          }}
        />
      </NewComponentSection>
      {plumeSite && (
        <NewComponentSection
          title={
            <Tooltip
              title={
                "These components come with interactivity and accessibility built-in."
              }
            >
              <span>
                <Icon icon={PlumeMarkIcon} /> Interactive components
              </span>
            </Tooltip>
          }
        >
          {plumeTemplates.map((comp) => {
            const plumeType = ensure(
              comp.plumeInfo,
              "Plume component should have plumeInfo"
            ).type;
            const plugin = getPlumeEditorPluginByType(plumeType);
            return (
              <NewComponentItem
                isSelected={comp.uuid === templateId}
                title={comp.name}
                imgUrl={getPlumeImage(plumeType)}
                tooltip={plugin?.componentMeta.description}
                onClick={() => {
                  const previousName = plumeTemplates.find(
                    (c) => c.uuid === templateId
                  )?.name;
                  setTemplateId(comp.uuid);
                  if (!name || previousName === name) {
                    setName(comp.name);
                  }
                  if (nameRef.current) {
                    nameRef.current.focus();
                  }
                }}
              />
            );
          })}
        </NewComponentSection>
      )}
      {studioCtx.appCtx.appConfig.showInsertableTemplateComponents &&
        otherTemplates.length > 0 && (
          <NewComponentSection title={"Common components"}>
            {otherTemplates.map((template) => {
              const thisTemplateId = `template:${template.templateName}`;
              return (
                <NewComponentItem
                  isSelected={templateId === thisTemplateId}
                  title={template.displayName ?? template.componentName}
                  imgUrl={template.imageUrl}
                  onClick={() => {
                    setName(template.componentName);
                    setTemplateId(thisTemplateId);
                    if (nameRef.current) {
                      nameRef.current.focus();
                    }
                  }}
                />
              );
            })}
          </NewComponentSection>
        )}
    </PlasmicNewComponentModal>
  );
}

export default NewComponentModal;
