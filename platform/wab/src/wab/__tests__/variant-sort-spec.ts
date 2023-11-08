import L from "lodash";
import { Variant } from "../classes";
import { ComponentType } from "../components";
import { TplMgr } from "../shared/TplMgr";
import { $$$ } from "../shared/TplQuery";
import {
  makeVariantComboSorter,
  sortedVariantCombos,
} from "../shared/variant-sort";
import {
  getBaseVariant,
  isPrivateStyleVariant,
  isStyleVariant,
  VariantCombo,
} from "../shared/Variants";
import { createSite } from "../sites";
import { mkTplTagX } from "../tpls";

describe("variant-sort", () => {
  const site = createSite();
  const tplMgr = new TplMgr({ site });
  const component = tplMgr.addComponent({ type: ComponentType.Frame });
  const base = getBaseVariant(component);
  const colorGroup = tplMgr.createVariantGroup({
    component: component,
    name: "color",
  });
  const blue = tplMgr.createVariant(component, colorGroup, "blue");
  const green = tplMgr.createVariant(component, colorGroup, "green");

  const typeGroup = tplMgr.createVariantGroup({
    component: component,
    name: "type",
  });
  const outline = tplMgr.createVariant(component, typeGroup, "outline");
  const text = tplMgr.createVariant(component, typeGroup, "text");

  const hover = tplMgr.createStyleVariant(component, ["Hover"]);
  const pressed = tplMgr.createStyleVariant(component, ["Pressed"]);
  const focused = tplMgr.createStyleVariant(component, ["Focused"]);
  const focusVisible = tplMgr.createStyleVariant(component, ["Focus Visible"]);
  const hoverFocused = tplMgr.createStyleVariant(component, [
    "Focused",
    "Hover",
  ]);

  const node = mkTplTagX("div", { baseVariant: base });
  $$$(component.tplTree!).append(node);

  const privateHover = tplMgr.createPrivateStyleVariant(component, node, [
    "Hover",
  ]);

  const themeGroup = tplMgr.createGlobalVariantGroup("Theme");
  const dark = tplMgr.createGlobalVariant(themeGroup, "Dark");

  const sorter = makeVariantComboSorter(site, component);

  const variantName = (variant: Variant) => {
    if (isPrivateStyleVariant(variant)) {
      return `private-${variant.selectors?.join(":")}`;
    } else if (isStyleVariant(variant)) {
      return `${variant.selectors?.join(":")}`;
    } else {
      return `${variant.name}`;
    }
  };

  const comboName = (combo: VariantCombo) => {
    return combo.map(variantName).join("-");
  };

  const verifySorted = (expected: VariantCombo[]) => {
    const shuffled = L.shuffle(expected);
    const sorted = sortedVariantCombos(shuffled, sorter);
    console.log("Expected", expected.map(comboName));
    console.log("Sorted", sorted.map(comboName));
    expect(sorted).toEqual(expected);
  };

  it("Should sort variant combos properly", () => {
    verifySorted([[base], [dark], [blue], [green], [outline], [text]]);
    verifySorted([[base], [dark], [green], [outline], [hover], [hoverFocused]]);
    verifySorted([
      [base],
      [dark],
      [green],
      [dark, green],
      [outline],
      [dark, outline],
      [hover],
      [dark, hover],
      [hoverFocused],
      [dark, hoverFocused],
    ]);
    verifySorted([
      [base],
      [dark],
      [green],
      [dark, green],
      [outline],
      [dark, outline],
      [green, outline],
      [green, outline, dark],
      [green, text],
      [hover],
      [green, hover],
      [hoverFocused],
    ]);
    verifySorted([
      [base],
      [dark],
      [green],
      [dark, green],
      [outline],
      [dark, outline],
      [green, outline],
      [green, outline, dark],
      [green, text],
      [hover],
      [green, hover],
      [hoverFocused],
      [dark, privateHover],
      [green, privateHover],
      [green, dark, privateHover],
      [text, privateHover],
      [text, dark, privateHover],
      [hoverFocused, privateHover],
      [hoverFocused, privateHover],
    ]);
    verifySorted([
      [base],
      [hover],
      [green, hover],
      [focused],
      [green, focused],
      [focusVisible],
      [green, focusVisible],
      [pressed],
      [green, pressed],
      [hoverFocused],
      [green, hoverFocused],
    ]);
  });
});
