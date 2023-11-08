import { SelectOptionRef } from "@plasmicapp/react-web";
import * as React from "react";
import {
  DefaultStyleSelect__OptionProps,
  PlasmicStyleSelect__Option,
} from "../../plasmic/plasmic_kit_style_controls/PlasmicStyleSelect__Option";

interface StyleSelect__OptionProps extends DefaultStyleSelect__OptionProps {}

function StyleSelect__Option_(
  props: StyleSelect__OptionProps,
  ref: SelectOptionRef
) {
  const { plasmicProps } = PlasmicStyleSelect__Option.useBehavior(props, ref);
  return (
    <PlasmicStyleSelect__Option
      isUnsetOption={props.value == null}
      {...plasmicProps}
    />
  );
}

const StyleSelect__Option = React.forwardRef(StyleSelect__Option_);

export default Object.assign(StyleSelect__Option, {
  __plumeType: "select-option",
});
