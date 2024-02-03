import { ComponentMeta, useSelector } from "@plasmicapp/host";
import get from "dlv";
import React from "react";
import { useStrapiCredentials } from "./StrapiCredentialsProvider";
import { modulePath } from "./utils";

interface StrapiFieldProps {
  className?: string;
  path?: string;
  setControlContextData?: (data: {
    fields: string[];
    isImage: boolean;
  }) => void;
}

export const strapiFieldMeta: ComponentMeta<StrapiFieldProps> = {
  name: "StrapiField",
  displayName: "Strapi Field",
  importName: "StrapiField",
  importPath: modulePath,
  props: {
    path: {
      type: "choice",
      options: (props, ctx) => {
        return ctx?.fields ?? [];
      },
      displayName: "Field",
      description: "Field name",
    },
  },
};

export function StrapiField({
  className,
  path,
  setControlContextData,
}: StrapiFieldProps) {
  const item = useSelector("strapiItem");
  if (!item) {
    return <div>StrapiField must be used within a StrapiCollection</div>;
  }

  // Getting only fields that aren't objects
  const attributes = get(item, ["attributes"]);
  const displayableFields = Object.keys(attributes).filter((field) => {
    const value = attributes[field];
    const maybeMime = get(value, "data.attributes.mime");
    return (
      typeof value !== "object" ||
      (typeof maybeMime === "string" && maybeMime.startsWith("image"))
    );
  });

  setControlContextData?.({
    fields: displayableFields,
    isImage: false,
  });

  if (!path) {
    return <div>StrapiField must specify a field name.</div>;
  }

  const data = get(item, ["attributes", path]);
  const maybeMime = data?.data?.attributes?.mime;

  setControlContextData?.({
    fields: displayableFields,
    isImage: typeof maybeMime === "string" && maybeMime.startsWith("image"),
  });

  if (!data) {
    return <div>Please specify a valid field name.</div>;
  } else if (typeof maybeMime === "string" && maybeMime.startsWith("image")) {
    const creds = useStrapiCredentials();
    const attrs = data.data.attributes;
    const img_url = attrs.url.startsWith("http")
      ? attrs.url
      : creds.host + attrs.url;
    const img_width = attrs.width;
    const img_height = attrs.height;
    return (
      <img
        className={className}
        src={img_url}
        width={300}
        height={(300 * img_height) / img_width}
      />
    );
  } else {
    return <div className={className}>{data}</div>;
  }
}
