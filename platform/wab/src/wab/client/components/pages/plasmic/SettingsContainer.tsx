import * as React from "react";
import PP__SettingsContainer from "./PlasmicSettingsContainer";
import { ApiTrustedHost, PersonalApiToken } from "../../../../shared/ApiSchema";
import { ensure } from "../../../../common";
import { Flex } from "@plasmicapp/react-web";
import TrustedHost from "../../TrustedHost";
import { isArray } from "lodash";
import { BareModal } from "../../studio/BareModal";
import { AsyncState } from "../../../hooks/useAsyncStrict";
const LazyChangePasswordModal = React.lazy(
  () => import("../../ChangePasswordModal")
);

interface SettingsContainerProps {
  avatarImgUrl?: string;
  name: string;
  email: string;
  tokensState: AsyncState<PersonalApiToken[]>;
  hideChangePassword?: boolean;
  onNewToken: () => void;
  onDeleteToken: (val: string) => void;
  copiedToken: string;
  onCopyToken: (e: React.MouseEvent, val: string) => void;
  hostsState: "loading" | "error" | ApiTrustedHost[] | undefined;
  onDeleteTrustedHost: (host: ApiTrustedHost) => void;
  onNewTrustedHost: () => void;
}

function SettingsContainer(props: SettingsContainerProps) {
  const tokenState = props.tokensState.loading
    ? "loading"
    : props.tokensState.error
    ? "error"
    : "loaded";

  const trustedHostsState =
    typeof props.hostsState === "string"
      ? props.hostsState
      : props.hostsState && "enabled";

  const overrides = {
    root: { props: { style: { userSelect: "text" } } } as Flex<"div">,
    newTokenButton: { props: { onClick: props.onNewToken } },
    newTrustedHostBtn: { onClick: props.onNewTrustedHost },
  };

  if (tokenState === "loaded") {
    const tokens = ensure(
      props.tokensState.value,
      "Unexpected undefined tokensState value"
    ).map((token) => {
      const copyState =
        props.copiedToken === token.token ? "copied" : undefined;
      return (
        <PP__SettingsContainer.tokenInstance
          tokenInstance={{
            tokenValue: token.token,
            onDelete: () => props.onDeleteToken(token.token),
            onCopy: (e) =>
              copyState !== "copied" && props.onCopyToken(e, token.token),
            copyState,
          }}
        />
      );
    });
    overrides["existingTokens"] = { children: tokens };
  }

  overrides["hostsList"] = {
    children: isArray(props.hostsState)
      ? props.hostsState.map((host) => (
          <TrustedHost
            host={host}
            onDelete={() => props.onDeleteTrustedHost(host)}
          />
        ))
      : [],
  };

  const [changingPassword, setChangingPassword] = React.useState(false);

  return (
    <>
      <PP__SettingsContainer
        variants={{ tokenState, trustedHostsState }}
        args={{
          avatarImgUrl: props.avatarImgUrl,
          name: props.name,
          email: props.email,
        }}
        overrides={overrides}
        hideChangePassword={props.hideChangePassword}
        changePasswordButton={{
          onClick: () => setChangingPassword(true),
        }}
      />
      {changingPassword && (
        <BareModal onClose={() => setChangingPassword(false)} width={480}>
          <React.Suspense>
            <LazyChangePasswordModal />
          </React.Suspense>
        </BareModal>
      )}
    </>
  );
}

export default SettingsContainer as React.FunctionComponent<SettingsContainerProps>;
