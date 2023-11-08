import React from "react";
import {
  DefaultEditableResourceNameProps,
  PlasmicEditableResourceName,
} from "../plasmic/plasmic_kit_dashboard/PlasmicEditableResourceName";
import { ClickStopper } from "./widgets";

interface EditableResourceNameProps extends DefaultEditableResourceNameProps {
  onEdit: () => void;
}

function EditableResourceName(props: EditableResourceNameProps) {
  const { onEdit, ...rest } = props;
  return (
    <PlasmicEditableResourceName
      {...rest}
      editButton={{
        wrap: (node) => (
          <ClickStopper
            style={{
              alignSelf: "center",
            }}
            preventDefault
          >
            {node}
          </ClickStopper>
        ),
        props: { onClick: onEdit },
      }}
    />
  );
}

export default EditableResourceName as React.FunctionComponent<EditableResourceNameProps>;
