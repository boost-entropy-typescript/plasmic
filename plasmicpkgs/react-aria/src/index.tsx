import { registerButton } from "./registerButton";
import { registerCheckbox } from "./registerCheckbox";
import { registerCheckboxGroup } from "./registerCheckboxGroup";
import { registerComboBox } from "./registerComboBox";
import { registerForm } from "./registerForm";
import { registerInput } from "./registerInput";
import { registerLabel } from "./registerLabel";
import { registerListBox } from "./registerListBox";
import { registerPopover } from "./registerPopover";
import { registerRadioGroup } from "./registerRadioGroup";
import { registerSection } from "./registerSection";
import { registerSelect } from "./registerSelect";
import { registerSwitch } from "./registerSwitch";
import { Registerable } from "./utils";

export function registerAll(loader?: Registerable) {
  registerSelect(loader);
  registerComboBox(loader);
  registerButton(loader);
  registerLabel(loader);
  registerListBox(loader);
  registerPopover(loader);
  registerInput(loader);
  registerSection(loader);
  registerSwitch(loader);
  registerForm(loader);
  registerCheckbox(loader);
  registerCheckboxGroup(loader);
  registerRadioGroup(loader);
}
