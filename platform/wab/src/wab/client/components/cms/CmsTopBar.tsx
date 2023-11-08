import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";
import { useRRouteMatch, UU } from "../../cli-routes";
import { useApi } from "../../contexts/AppContexts";
import {
  DefaultCmsTopBarProps,
  PlasmicCmsTopBar,
} from "../../plasmic/plasmic_kit_cms/PlasmicCmsTopBar";
import { useCmsDatabase, useMutateDatabase } from "./cms-contexts";

export interface CmsTopBarProps extends DefaultCmsTopBarProps {}

function CmsTopBar_(props: CmsTopBarProps, ref: HTMLElementRefOf<"div">) {
  const match = useRRouteMatch(UU.cmsRoot)!;
  const database = useCmsDatabase(match?.params.databaseId);
  const api = useApi();
  const mutateDatabase = useMutateDatabase();
  return (
    <PlasmicCmsTopBar
      root={{ ref }}
      cmsNameValue={database?.name}
      cmsName={{
        value: database?.name,
        onChange: async (newName) => {
          await api.updateCmsDatabase(database!.id, { name: newName });
          await mutateDatabase(database!.id);
        },
      }}
      {...props}
    />
  );
}

const CmsTopBar = React.forwardRef(CmsTopBar_);
export default CmsTopBar;
