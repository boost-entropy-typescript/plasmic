import * as React from "react";
import {
  DefaultGitJobStepProps,
  PlasmicGitJobStep,
} from "../../plasmic/plasmic_kit_continuous_deployment/PlasmicGitJobStep";
import PublishSpinner from "./PublishSpinner";

interface GitJobStepProps extends DefaultGitJobStepProps {
  description: React.ReactNode;
}

const dict = {
  "Set up job": "Setting up job...",
  "Build repo-sync/pull-request@v2": "Building pull-request dependency...",
  "Post Cache node_modules": "Caching node_modules...",
  "Post Checkout repository": "Cleaning up checkout job...",
  "Complete job": "Completing job...",
} as const;

function GitJobStep(props: GitJobStepProps) {
  const { description, ...rest } = props;
  const text =
    typeof description === "string" && description in dict
      ? dict[description]
      : description;
  return (
    <PlasmicGitJobStep
      {...rest}
      children={text}
      svg={
        rest.status === "started"
          ? {
              render: () => <PublishSpinner />,
            }
          : undefined
      }
    />
  );
}

export default GitJobStep;
