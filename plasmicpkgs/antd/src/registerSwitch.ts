import registerComponent, {
  ComponentMeta,
} from "@plasmicapp/host/registerComponent";
import Switch, { SwitchProps } from "antd/lib/switch";
import { Registerable } from "./registerable";

export const switchMeta: ComponentMeta<SwitchProps> = {
  name: "AntdSwitch",
  displayName: "Antd Switch",
  props: {
    autoFocus: {
      type: "boolean",
      description: "Whether get focus when component mounted",
      defaultValueHint: false,
    },
    checked: {
      type: "boolean",
      editOnly: true,
      uncontrolledProp: "defaultChecked",
      description: "Whether to set the initial state",
      defaultValueHint: false,
    },
    disabled: {
      type: "boolean",
      description: "Disable switch",
      defaultValueHint: false,
    },
    loading: {
      type: "boolean",
      description: "Loading state of switch",
      defaultValueHint: false,
    },
    checkedChildren: {
      type: "slot",
      defaultValue: [],
      hidePlaceholder: true,
    },
    unCheckedChildren: {
      type: "slot",
      defaultValue: [],
      hidePlaceholder: true,
    },
    size: {
      type: "choice",
      options: ["small", "default"],
      description: "The size of the Switch",
      defaultValueHint: "default",
    },
  },
  importPath: "antd/lib/switch",
  importName: "Switch",
  isDefaultExport: true,
};

export function registerSwitch(
  loader?: Registerable,
  customSwitchMeta?: ComponentMeta<SwitchProps>
) {
  const doRegisterComponent: typeof registerComponent = (...args) =>
    loader ? loader.registerComponent(...args) : registerComponent(...args);
  doRegisterComponent(Switch, customSwitchMeta ?? switchMeta);
}
