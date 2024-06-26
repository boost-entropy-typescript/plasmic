import { Component, VariantsRef } from "@/wab/classes";
import { ACCEPTED_PROP_TYPES } from "@/wab/client/figma-importer/constants";
import {
  ComponentPropertiesEntries,
  ComponentProperty,
  InstanceNode,
} from "@/wab/client/figma-importer/plugin-types";
import { StudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { hackyCast, isJsonScalar, withoutNils } from "@/wab/common";
import { getParamByVarName, isCodeComponent } from "@/wab/components";
import { isSlot } from "@/wab/shared/SlotUtils";
import { isStandaloneVariantGroup } from "@/wab/shared/Variants";
import { toVarName } from "@/wab/shared/codegen/util";
import { isBoolType, isNumType } from "@/wab/shared/core/model-util";
import { notification } from "antd";
import { isBoolean, isNumber, isObject, isString, omit } from "lodash";

function getChildComponentNameFromPropertyKey(
  allDescendants: InstanceNode[],
  key: string | undefined
) {
  if (!key) {
    return undefined;
  }
  const refNode = allDescendants.find(
    (child) => child.componentPropertyReferences?.mainComponent === key
  );

  const nodeName = refNode?.name;
  if (!nodeName) {
    return undefined;
  }

  // if the name contains `/` it means it uses group naming, so we will use the last part of the name
  return nodeName.includes("/") ? nodeName.split("/").pop() : nodeName;
}

function fixComponentFigmaPropKey(key: string, prop: ComponentProperty) {
  // Fix property name, removing the suffix that figma adds to text and boolean properties
  if (prop.type === "TEXT" || prop.type === "BOOLEAN") {
    return key.substring(0, key.lastIndexOf("#"));
  }
  return key;
}

function isFigmaTrueishValue(value: number | string | boolean) {
  if (isBoolean(value)) {
    return value;
  }
  if (isNumber(value)) {
    return value === 1;
  }
  return ["true", "on"].includes(`${value}`.trim().toLowerCase());
}

function fixComponentFigmaPropValue(
  key: string,
  figmaProp: ComponentProperty,
  descendants: InstanceNode[]
): ComponentProperty {
  // We remove the "parent" prop from the object, since those values can go
  // through user code to be transformed
  const prop = omit(figmaProp, "parent");

  // Figma prop.value will either be a string, boolean or number, but we want to
  // but we will try to ensure that the value is a boolean, as we runned into
  if (prop.type === "BOOLEAN") {
    if (isBoolean(prop.value)) {
      return prop;
    }
    return { ...prop, value: isFigmaTrueishValue(prop.value) };
  }

  if (prop.type === "INSTANCE_SWAP") {
    return {
      ...prop,
      // The type INSTANCE_SWAP is not helpful for the transformation process, so
      // we will change it to TEXT, to make it easier to transform
      type: "TEXT",
      value:
        getChildComponentNameFromPropertyKey(descendants, key) ?? prop.value,
    };
  }

  return prop;
}

function filterFigmaPropsFromComponent(
  component: Component,
  figmaProps: ComponentPropertiesEntries,
  opts: {
    includePropsWithoutParam: boolean;
  }
) {
  return figmaProps.filter(([key, prop]) => {
    if (key === "parent") {
      return false;
    }

    if (!ACCEPTED_PROP_TYPES.includes(prop.type)) {
      return false;
    }

    if (!isJsonScalar(prop.value)) {
      return false;
    }

    const param = getParamByVarName(component, toVarName(key));
    if (!param) {
      return opts.includePropsWithoutParam;
    }
    // We will filter out props that will match to a slot as they aren't expected
    // to be passed as props to the component
    return !isSlot(param);
  });
}

function fromFigmaNodeToFigmaProps(
  component: Component,
  inst: InstanceNode,
  descendants: InstanceNode[]
): ComponentPropertiesEntries {
  const localProps: ComponentPropertiesEntries = Object.entries(
    inst.componentProperties ?? {}
  );

  const exposedInstances: InstanceNode[] = inst.exposedInstances ?? [];

  const exposedProps = exposedInstances.flatMap((_inst) =>
    fromFigmaNodeToFigmaProps(component, _inst, descendants)
  );

  // When creating the nodes while denormalizing the data, we always create an
  // "parent" prop to every Object, which just points to its parent on the
  // entire tree, but that applies to every object (since we don't know before
  // which objects are nodes), so we also add the parent to the object
  // "ComponentProperties"... which is why we filter it here

  return filterFigmaPropsFromComponent(
    component,
    [...localProps, ...exposedProps],
    {
      // This is before we transform the props, so we want to allow extraneous props
      // to the component in Plasmic, so that the user can transform them
      includePropsWithoutParam: true,
    }
  ).map(([key, prop]) => {
    return [
      fixComponentFigmaPropKey(key, prop),
      fixComponentFigmaPropValue(key, prop, descendants),
    ];
  });
}

function getAllDescendants(inst: InstanceNode): InstanceNode[] {
  const children = inst.children ?? [];
  const descendants = children.flatMap((child) =>
    child.type === "INSTANCE" ? [child, ...getAllDescendants(child)] : []
  );
  return descendants;
}

type ComponentPropsObject = Record<string, string | number | boolean>;

function fromFigmaPropsToTplProps(
  component: Component,
  figmaProps: ComponentPropsObject
): Array<[string, VariantsRef | string | number | boolean]> {
  return withoutNils(
    Object.entries(figmaProps).map(([key, value]) => {
      const param = getParamByVarName(component, toVarName(key));

      if (!param || isSlot(param) || !isJsonScalar(value)) {
        return null;
      }

      const variantGroup = component.variantGroups.find(
        (group) => group.param === param
      );
      if (variantGroup) {
        // Currently only will toggle single-variants if the Property and Value has the same name, the value has the name "on" or if its
        // a boolean prop. For variant groups, works as expected (matches figma property with group name, and value with variant name)
        if (isStandaloneVariantGroup(variantGroup)) {
          return value
            ? [
                param.variable.name,
                new VariantsRef({ variants: [variantGroup.variants[0]] }),
              ]
            : null;
        } else {
          const variant = variantGroup.variants.find(
            (v) => toVarName(v.name) === toVarName(`${value}`)
          );
          return variant
            ? [param.variable.name, new VariantsRef({ variants: [variant] })]
            : null;
        }
      }
      // Link props crashes studio if assigned an boolean
      if (param.type.name === "href" && isBoolean(value)) {
        return null;
      }
      // Parse text to number if param is number
      if (isNumType(param.type) && isString(value)) {
        return [param.variable.name, Number(value)];
      }
      if (isBoolType(param.type)) {
        // We may have to convert a string value to a boolean as we may be mapping a variant
        // to a boolean prop
        return isFigmaTrueishValue(value) ? [param.variable.name, true] : null;
      }
      return [param.variable.name, value];
    })
  );
}

function safeTransformFigmaProps(
  component: Component,
  transformFigmaProps: (props: ComponentPropsObject) => ComponentPropsObject,
  props: ComponentPropsObject
): { props: ComponentPropsObject; success: true } | { success: false } {
  try {
    const transformedProps = transformFigmaProps(props);
    if (isObject(transformedProps)) {
      return {
        props: transformedProps,
        success: true,
      };
    }
  } catch (e) {
    // If the transformation fails, we will just notify the user, log the error and
    // continue with the original props
    notification.error({
      message: `Error transforming figma props for code component ${component.name} using figmaPropsTransform function`,
    });
    console.error(
      `Error transforming figma props for code component ${component.name}`,
      e
    );
  }

  return {
    success: false,
  };
}

function maybeTransformFigmaProps(
  studioCtx: StudioCtx,
  component: Component,
  figmaProps: ComponentPropertiesEntries
): ComponentPropsObject {
  const componentProps = Object.fromEntries(
    figmaProps.map(([key, prop]) => [key, prop.value])
  );

  if (isCodeComponent(component)) {
    const meta = studioCtx.getCodeComponentMeta(component);
    if (meta && hackyCast(meta).figmaPropsTransform) {
      const transformResult = safeTransformFigmaProps(
        component,
        hackyCast(meta).figmaPropsTransform,
        componentProps
      );

      if (transformResult.success) {
        return transformResult.props;
      }
    }
  }
  return componentProps;
}

export function fromFigmaComponentToTplProps(
  studioCtx: StudioCtx,
  component: Component,
  node: InstanceNode
) {
  const allDescendants = getAllDescendants(node);

  const figmaProps = fromFigmaNodeToFigmaProps(component, node, allDescendants);

  return fromFigmaPropsToTplProps(
    component,
    maybeTransformFigmaProps(studioCtx, component, figmaProps)
  );
}
