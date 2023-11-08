import { observer } from "mobx-react-lite";
import React from "react";
import { TokenType } from "../../../commons/StyleToken";
import {
  LabeledStyleDimItemRow,
  SectionSeparator,
} from "../sidebar/sidebar-helpers";
import { ExpsProvider } from "../style-controls/StyleComponent";
import {
  AlignmentGridControl,
  getFlexLabel,
  getGridLocation,
} from "./FlexContainerControls";

export const ContentLayoutContainerControls = observer(
  function ContentLayoutContainerControls(props: {
    expsProvider: ExpsProvider;
  }) {
    return (
      <>
        <AlignmentGridControl
          xProp="justify-items"
          xOptions={makeContentLayoutAlignmentOptions("x")}
          yProp="align-content"
          yOptions={makeContentLayoutAlignmentOptions("y")}
          arrangement="column"
          containerStyles={{
            display: "grid",
          }}
        />
        <SectionSeparator className="mv-m" />
        <LabeledStyleDimItemRow
          label={"Gap"}
          styleName="grid-row-gap"
          tokenType={TokenType.Spacing}
          dimOpts={{
            allowedUnits: ["px"],
            min: 0,
            dragScale: "10",
          }}
        />
      </>
    );
  }
);

const xValues = ["flex-start", "center", "flex-end", "stretch"] as const;

const yValues = [
  "flex-start",
  "center",
  "flex-end",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
] as const;

function makeContentLayoutAlignmentOptions(axis: "x" | "y") {
  const values = axis === "x" ? xValues : yValues;
  return values.map((value) => ({
    value,
    label: getFlexLabel({
      value,
      direction: axis === "x" ? "horizontal" : "vertical",
      reverse: false,
    }),
    ...getGridLocation({
      value,
      axis,
      reverse: false,
    }),
  }));
}
