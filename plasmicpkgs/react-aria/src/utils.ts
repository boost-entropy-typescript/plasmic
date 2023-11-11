import type { CodeComponentMeta } from "@plasmicapp/host";
import registerComponent from "@plasmicapp/host/registerComponent";
import React from "react";

export type Registerable = {
  registerComponent: typeof registerComponent;
};

export type CodeComponentMetaOverrides<T extends React.ComponentType<any>> =
  Partial<
    Pick<
      CodeComponentMeta<React.ComponentProps<T>>,
      "parentComponentName" | "props" | "displayName"
    >
  >;

export function registerComponentHelper<T extends React.ComponentType<any>>(
  loader: Registerable | undefined,
  component: T,
  meta: CodeComponentMeta<React.ComponentProps<T>>,
  overrides?: CodeComponentMetaOverrides<T>
) {
  if (overrides) {
    meta = {
      ...meta,
      ...overrides,
      props: {
        ...meta.props,
        ...overrides.props,
      },
    };
    if (overrides.parentComponentName) {
      meta.name = makeChildComponentName(
        overrides.parentComponentName,
        meta.name
      );
    }
  }
  if (loader) {
    loader.registerComponent(component, meta);
  } else {
    registerComponent(component, meta);
  }
}

export function makeComponentName(name: string) {
  return `plasmic-react-aria-${name}`;
}

export function makeChildComponentName(
  fullParentName: string | undefined,
  fullChildName: string
) {
  if (!fullParentName) {
    return fullChildName;
  }
  return `${fullParentName}-${fullChildName.replace(
    "plasmic-react-aria-",
    ""
  )}`;
}

export interface Styleable {
  className?: string;
  style?: React.CSSProperties;
}

export function extractPlasmicDataProps(props: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(props).filter(([key, val]) =>
      key.startsWith("data-plasmic-")
    )
  );
}

export function withoutNils<T>(array: (T | undefined | null)[]) {
  return array.filter((x): x is T => x != null);
}
