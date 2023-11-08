import { explorerPlugin } from "@graphiql/plugin-explorer";
import { Fetcher } from "@graphiql/toolkit";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import React, { useMemo, useState } from "react";
import Button from "../components/widgets/Button";

const createFetcher = ({
  url: urlStr,
  headers,
  method = "POST",
}: {
  url: string;
  headers?: Record<string, string>;
  method?: string;
}): Fetcher => {
  return async (rawPayload, opts) => {
    const urlObj = new URL(urlStr);
    // Really, just need to stringify variables
    const payload = rawPayload;

    // GraphQL supports GET methods, with ?query={...}:
    // https://graphql.org/learn/serving-over-http/
    if (method === "GET") {
      // Combine with any existing search
      const queryParams = new URLSearchParams(urlObj.search);
      for (const key in payload) {
        queryParams.set(key, payload[key]);
      }
      urlObj.search = queryParams.toString();
    }

    return fetch(urlObj.toString(), {
      method,
      body: method === "POST" ? JSON.stringify(payload) : undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(headers ?? {}),
      },
    }).then((response) => response.json());
  };
};

interface GraphiqlWithExplorerProps {
  defaultQuery?: string;
  defaultVariables?: string;
  url: string;
  headers?: Record<string, string>;
  method?: string;
  onSave?: (query: string, variables) => void;
  onCancel?: () => void;
}

export default function GraphiqlWithExplorer({
  defaultQuery,
  defaultVariables,
  url,
  headers,
  onSave,
  onCancel,
}: GraphiqlWithExplorerProps) {
  const fetcher = useMemo(
    () => createFetcher({ url, headers }),
    ["url", "headers", "method"]
  );
  const explorer = explorerPlugin({
    showAttribution: false,
    explorerIsOpen: true,
  });
  const [query, setQuery] = useState(defaultQuery ?? "");
  const [variables, setVariables] = useState(defaultVariables);
  return (
    <div className="flex-col fill-height">
      <div className={"fill-height standard-gql-ui"}>
        <GraphiQL
          fetcher={fetcher}
          query={query}
          onEditQuery={setQuery}
          onEditVariables={setVariables}
          isHeadersEditorEnabled={false}
          visiblePlugin={"GraphiQL Explorer"}
          plugins={[explorer]}
          variables={variables}
        />
      </div>

      <div className="flex-no-shrink flex flex-right mt-lg mr-xlg">
        <Button
          onClick={() => {
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          className={"ml-lg"}
          onClick={() => {
            onSave?.(query, variables);
          }}
          type={"primary"}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
