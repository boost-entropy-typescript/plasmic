import {
  isKnownTplSlot,
  TplComponent,
  TplNode,
  TplSlot,
  TplTag,
  Type,
  Var,
} from "../classes";
import { ensure, ensureInstance } from "../common";
import { findVarRefs, isCodeComponent } from "../components";
import { Selectable } from "../selection";
import { SlotSelection } from "../slots";
import {
  getComponentIfRoot,
  hasChildrenSlot,
  hasTextAncestor,
  isAtomicTag,
  isTableNonLeafElement,
  isTableSubElement,
  isTableTopElement,
  isTplComponent,
  isTplImage,
  isTplSlot,
  isTplTag,
  isTplTextBlock,
} from "../tpls";
import { ValNode } from "../val-nodes";
import { nodeConformsToType } from "./core/model-util";
import { isTagListContainer } from "./core/rich-text-util";
import { getPlumeEditorPlugin } from "./plume/plume-registry";
import { getParentOrSlotSelection } from "./SlotUtils";
import { $$$ } from "./TplQuery";

export type CantAddChildMsg =
  | CantAddToTplComponentMsg
  | CantAddToTableNonLeafMsg
  | CantAddToImgMsg
  | CantAddToAtomicMsg
  | CantAddToAttrsChildrenMsg
  | CantAddToTextBlockMsg
  | CantAddLinkedPropsToSlotMsg
  | CantAddToSelfDescendantMsg
  | CantAddCToCodeComponentRootMsg
  | CantAddNonListItemToListMsg
  | CantAddListItemToNonListMsg
  | ViolatesSlotTypeMsg;

export interface CantAddCToCodeComponentRootMsg {
  type: "CantAddToCodeComponentRoot";
  tpl: TplTag;
}

export interface CantAddNonListItemToListMsg {
  type: "CantAddNonListItemToList";
  tpl: TplTag;
}

export interface CantAddListItemToNonListMsg {
  type: "CantAddListItemToNonList";
  tpl: TplNode;
}

export interface CantAddToTplComponentMsg {
  type: "CantAddToTplComponent";
  tpl: TplComponent;
}

export interface CantAddToTableNonLeafMsg {
  type: "CantAddToTableNonLeaf";
  tpl: TplTag;
}

export interface CantAddToImgMsg {
  type: "CantAddToImg";
  tpl: TplTag;
}

export interface CantAddToAtomicMsg {
  type: "CantAddToAtomic";
  tpl: TplTag;
}

export interface CantAddToAttrsChildrenMsg {
  type: "CantAddToAttrsChildren";
  tpl: TplTag;
}

export interface CantAddToTextBlockMsg {
  type: "CantAddToTextBlock";
  tpl: TplTag;
}

export interface CantAddLinkedPropsToSlotMsg {
  type: "CantAddLinkedPropsToSlot";
  slot: TplSlot;
  tpl: TplNode;
  vars: Var[];
}

export interface CantAddToSelfDescendantMsg {
  type: "CantAddToSelfDescendant";
  descendant: TplNode;
  self: TplNode;
}

export interface ViolatesSlotTypeMsg {
  type: "ViolatesSlotType";
  slotType: Type;
}

export function canAddChildrenAndWhy(
  tpl: TplNode | SlotSelection,
  child?: TplNode
): true | CantAddChildMsg {
  if (tpl instanceof SlotSelection) {
    return canAddChildrenToSlotSelectionAndWhy(tpl, child);
  } else if (isTplComponent(tpl) && !hasChildrenSlot(tpl)) {
    return { type: "CantAddToTplComponent", tpl };
  } else if (isTplTag(tpl)) {
    const component = getComponentIfRoot(tpl);
    if (component && isCodeComponent(component)) {
      return { type: "CantAddToCodeComponentRoot", tpl };
    }
    if (isTableNonLeafElement(tpl)) {
      return { type: "CantAddToTableNonLeaf", tpl };
    }
    if (isTplImage(tpl)) {
      return { type: "CantAddToImg", tpl };
    }
    if (isAtomicTag(tpl.tag)) {
      return { type: "CantAddToAtomic", tpl };
    }
    if (tpl.vsettings.some((vs) => !!vs.attrs.children)) {
      return { type: "CantAddToAttrsChildren", tpl };
    }
    const atomicTextTags = [
      "div",
      "a",
      "code",
      "blockquote",
      "pre",
      "p",
      "label",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ];
    if (
      isTplTextBlock(tpl) &&
      (atomicTextTags.includes(tpl.tag) || hasTextAncestor(tpl))
    ) {
      // We don't allow adding children to Text blocks, unless it is a Text block
      // with a special tag (button, section, etc.) and is not in a NodeMarker, in
      // which case, we'll help you transform it into a container when you do
      // add a child.
      return { type: "CantAddToTextBlock", tpl };
    }
  } else if (isTplSlot(tpl) && child) {
    const slotType = getSlotLikeType(tpl);
    if (!nodeConformsToType(child, slotType)) {
      return { type: "ViolatesSlotType", slotType };
    }
  }

  if (
    isTplTag(tpl) &&
    isTagListContainer(tpl.tag) &&
    child &&
    (!isTplTag(child) || child.tag !== "li")
  ) {
    return {
      type: "CantAddNonListItemToList",
      tpl,
    };
  }

  if (
    isTplTag(child) &&
    child.tag === "li" &&
    (!isTplTag(tpl) || !isTagListContainer(tpl.tag))
  ) {
    return {
      type: "CantAddListItemToNonList",
      tpl,
    };
  }

  if (child) {
    const ancestors = $$$(tpl).ancestors().toArrayOfTplNodes();
    const parentSlot = ancestors.find(isTplSlot);
    if (parentSlot) {
      const varRefs = Array.from(findVarRefs(child));
      if (varRefs.length > 0) {
        return {
          type: "CantAddLinkedPropsToSlot",
          slot: parentSlot,
          tpl: child,
          vars: varRefs.map((v) => v.var),
        };
      }
    }

    if (ancestors.includes(child)) {
      return {
        type: "CantAddToSelfDescendant",
        descendant: tpl,
        self: child,
      };
    }
  }

  return true;
}

export function canAddChildrenToSelectableAndWhy(
  obj: Selectable,
  child?: TplNode
) {
  const tplOrSelection = obj instanceof ValNode ? obj.tpl : obj;
  return canAddChildrenAndWhy(tplOrSelection, child);
}

export const canAddChildren = (tpl: TplNode | SlotSelection, child?: TplNode) =>
  canAddChildrenAndWhy(tpl, child) === true;

export function canAddChildrenToSlotSelection(
  ss: SlotSelection,
  child?: TplNode
) {
  return canAddChildrenToSlotSelectionAndWhy(ss, child) === true;
}

export function getSlotLikeType(slotLike: TplSlot | SlotSelection) {
  const component = isKnownTplSlot(slotLike)
    ? $$$(slotLike).owningComponent()
    : slotLike.getTpl().component;
  const param = isKnownTplSlot(slotLike) ? slotLike.param : slotLike.slotParam;
  return (
    getPlumeEditorPlugin(component)?.getSlotType?.(component, param) ??
    param.type
  );
}

export function canAddChildrenToSlotSelectionAndWhy(
  ss: SlotSelection,
  child?: TplNode
): ViolatesSlotTypeMsg | CantAddToSelfDescendantMsg | true {
  if (child) {
    if ($$$(ss.getTpl()).ancestors().toArrayOfTplNodes().includes(child)) {
      return {
        type: "CantAddToSelfDescendant",
        descendant: ss.getTpl(),
        self: child,
      };
    }
    const slotType = getSlotLikeType(ss);
    if (!nodeConformsToType(child, slotType)) {
      return {
        type: "ViolatesSlotType",
        slotType,
      };
    }
  }
  return true;
}

export const canAddSiblings = (tpl: TplNode, toInsert?: TplNode) =>
  canAddSiblingsAndWhy(tpl, toInsert) === true;

export type CantAddSiblingMsg =
  | CantAddChildMsg
  | CantAddSiblingToRootMsg
  | CantAddSiblingToTableSubMsg
  | CantAddSiblingToSlotSelection
  | CantAddToTextBlockMsg;
export interface CantAddSiblingToRootMsg {
  type: "CantAddSiblingToRoot";
  tpl: TplTag | TplComponent;
}
export interface CantAddSiblingToTableSubMsg {
  type: "CantAddSiblingToTableSub";
  tpl: TplTag | TplComponent;
}
export interface CantAddSiblingToSlotSelection {
  type: "CantAddSiblingToSlotSelection";
  slotSelection: SlotSelection;
}
export function canAddSiblingsAndWhy(
  tpl: TplNode | SlotSelection,
  toInsert?: TplNode | SlotSelection
): true | CantAddSiblingMsg {
  if (tpl instanceof SlotSelection || toInsert instanceof SlotSelection) {
    return {
      type: "CantAddSiblingToSlotSelection",
      slotSelection:
        tpl instanceof SlotSelection
          ? tpl
          : ensureInstance(toInsert, SlotSelection),
    };
  }
  if (!tpl.parent) {
    return { type: "CantAddSiblingToRoot", tpl: tpl as TplTag | TplComponent };
  }
  const parent = ensure(
    getParentOrSlotSelection(tpl),
    "already checked before"
  );
  const canAddToParent = canAddChildrenAndWhy(parent, toInsert);
  if (canAddToParent !== true) {
    return canAddToParent;
  }

  if (isTplTag(tpl) && isTableSubElement(tpl) && !isTableTopElement(tpl)) {
    return { type: "CantAddSiblingToTableSub", tpl };
  }
  if (isTplTextBlock(tpl.parent)) {
    return { type: "CantAddToTextBlock", tpl: tpl.parent };
  }
  return true;
}
