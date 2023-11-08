import * as L from "lodash";
import { ensure } from "../../common";
import { GitSyncAction, GitWorkflowJobStatus } from "../../shared/ApiSchema";
import { Config } from "../config";
import { DbMgr } from "../db/DbMgr";
import { ProjectRepository, User } from "../entities/Entities";
import { tryUpdateCachedCname } from "./pages";
import { mkCommitMessage } from "./util";
import {
  createOrUpdateWorkflow,
  triggerWorkflow,
  tryGetLastUnfinishedWorkflowRun,
} from "./workflows";

type RunGitJobArgs = {
  config: Config;
  mgr: DbMgr;
  user: User;

  // projectRepository is expected to have a "project" relation.
  projectRepository: ProjectRepository;

  // If none is given, projectRepository defaults are used.
  branch?: string;
  action?: string;

  // Optional PR/commit title and description.
  title?: string;
  description?: string;
};

// If the workflow is already running, it returns the current run; otherwise
// start running a workflow and return null.
export async function runGitJob(
  args: RunGitJobArgs
): Promise<GitWorkflowJobStatus> {
  const { projectRepository, config, mgr, user } = args;

  const {
    projectId,
    directory,
    scheme,
    platform,
    language,
  } = projectRepository;
  const project = ensure(projectRepository.project);
  const installationId = ensure(projectRepository.installationId);
  const [owner, repo] = projectRepository.repository.split("/");
  const branch = args.branch ?? projectRepository.defaultBranch;
  const action = args.action ?? projectRepository.defaultAction;

  const { title, description } = mkCommitMessage(
    args.title || `[plasmic] Sync project ${project.name}`,
    args.description,
    user,
    project,
    config
  );

  const projectApiToken = await mgr.validateOrGetProjectApiToken(projectId);

  const ref = {
    installationId,
    owner,
    repo,
    branch,
  };

  if (projectRepository.cachedCname) {
    await tryUpdateCachedCname(mgr, projectRepository);
  }

  await createOrUpdateWorkflow(L.omit(ref, "branch"));

  // If the workflow is already running, just return the current run instead
  // of triggering a new one.
  const run = await tryGetLastUnfinishedWorkflowRun(L.omit(ref, "branch"));
  if (run.state === "running") {
    return run;
  }

  await triggerWorkflow(ref, {
    branch,
    directory,
    projectId,
    projectApiToken,
    platform,
    language,
    scheme,
    syncAction: action as GitSyncAction,
    title,
    description,
    publish: projectRepository.publish,
  });

  return {
    state: "requested",
  };
}
