import { SelectOptionRef } from "@plasmicapp/react-web";
import * as React from "react";
import {
  DefaultHostProtocolSelect__OptionProps,
  PlasmicHostProtocolSelect__Option,
} from "./wab/client/plasmic/plasmic_kit_dashboard/PlasmicHostProtocolSelect__Option";

interface HostProtocolSelect__OptionProps
  extends DefaultHostProtocolSelect__OptionProps {}

function HostProtocolSelect__Option_(
  props: HostProtocolSelect__OptionProps,
  ref: SelectOptionRef
) {
  const { plasmicProps } = PlasmicHostProtocolSelect__Option.useBehavior(
    props,
    ref
  );
  return <PlasmicHostProtocolSelect__Option {...plasmicProps} />;
}

const HostProtocolSelect__Option = React.forwardRef(
  HostProtocolSelect__Option_
);

export default Object.assign(HostProtocolSelect__Option, {
  __plumeType: "select-option",
});
