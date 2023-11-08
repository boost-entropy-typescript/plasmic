import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { uniqBy } from "lodash";
import * as React from "react";
import { WorkspaceId } from "../../../shared/ApiSchema";
import { useAppCtx } from "../../contexts/AppContexts";
import { useAsyncFnStrict, useAsyncStrict } from "../../hooks/useAsyncStrict";
import { useProjectsFilter } from "../../hooks/useProjectsFilter";
import {
  DefaultWorkspacePageProps,
  PlasmicWorkspacePage,
} from "../../plasmic/plasmic_kit_dashboard/PlasmicWorkspacePage";
import { Spinner } from "../widgets";
import { documentTitle } from "./page-utils";

interface WorkspacePageProps
  extends Omit<DefaultWorkspacePageProps, "children" | "title"> {
  workspaceId: WorkspaceId;
}

function WorkspacePage_(
  props: WorkspacePageProps,
  ref: HTMLElementRefOf<"div">
) {
  const appCtx = useAppCtx();
  const { workspaceId, ...rest } = props;

  const [asyncData, fetchAsyncData] = useAsyncFnStrict(async () => {
    const { workspace, perms: workspacePerms } = await appCtx.api.getWorkspace(
      workspaceId
    );
    const { projects, perms: projectsPerms } = await appCtx.api.getProjects({
      query: "byWorkspace",
      workspaceId,
    });
    const databases = await appCtx.api.listCmsDatabasesForWorkspace(
      workspaceId
    );
    const perms = uniqBy([...workspacePerms, ...projectsPerms], (p) => p.id);
    return { workspace, projects, databases, perms };
  }, [workspaceId]);
  useAsyncStrict(fetchAsyncData, [workspaceId]);

  const {
    workspace,
    projects: unsortedProjects,
    databases: unsortedDatabases,
    perms,
  } = asyncData.value ?? {
    projects: [],
    perms: [],
  };

  const {
    projects,
    databases,
    matcher,
    props: filterProps,
  } = useProjectsFilter(unsortedProjects, unsortedDatabases ?? [], false);

  return (
    <>
      {documentTitle(workspace?.name || "Loading workspace...")}
      <PlasmicWorkspacePage
        root={{ ref }}
        defaultLayout={{
          wrapChildren: (children) =>
            !asyncData?.value ? <Spinner /> : children,
        }}
        workspaceSection={
          !asyncData?.value
            ? {
                render: () => null,
              }
            : {
                workspace,
                projects,
                databases,
                onUpdate: async () => {
                  await fetchAsyncData();
                },
                perms,
                matcher,
                filterProps,
              }
        }
        {...rest}
      />
    </>
  );
}

const WorkspacePage = React.forwardRef(WorkspacePage_);
export default WorkspacePage;
