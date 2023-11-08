/** @format */

import { observer } from "mobx-react-lite";
import * as React from "react";
import { ApiPermission, ApiProject } from "../../../../shared/ApiSchema";
import { useTopFrameCtx } from "../../../frame-ctx/top-frame-ctx";
import ShareDialogContent from "../../widgets/plasmic/ShareDialogContent";
import { TopBarModal } from "./TopBarModal";

interface ShareModalProps {
  refreshProjectAndPerms: () => void;
  project: ApiProject;
  perms: ApiPermission[];
  showShareModal: boolean;
  setShowShareModal: (val: boolean) => Promise<void>;
}

export const ShareModal = observer(function ShareModal({
  refreshProjectAndPerms,
  project,
  perms,
  showShareModal,
  setShowShareModal,
}: ShareModalProps) {
  const { hostFrameApi } = useTopFrameCtx();
  return (
    <>
      {showShareModal && (
        <TopBarModal
          title={
            <>
              Share <strong>{project.name}</strong>
            </>
          }
          closable
          onClose={() => setShowShareModal(false)}
        >
          <ShareDialogContent
            closeDialog={() => setShowShareModal(false)}
            perms={perms}
            reloadPerms={async () => {
              await hostFrameApi.refreshSiteInfo();
              refreshProjectAndPerms();
            }}
            updateResourceCallback={async () => {
              await hostFrameApi.refreshSiteInfo();
              refreshProjectAndPerms();
            }}
            resource={{
              type: "project",
              resource: project,
            }}
          />
        </TopBarModal>
      )}
    </>
  );
});

export default ShareModal;
