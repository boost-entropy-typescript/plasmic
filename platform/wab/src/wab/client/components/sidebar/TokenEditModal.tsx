import { observer } from "mobx-react-lite";
import * as React from "react";
import { StyleToken } from "../../../classes";
import { TokenType } from "../../../commons/StyleToken";
import { VariantedStylesHelper } from "../../../shared/VariantedStylesHelper";
import { StudioCtx } from "../../studio-ctx/StudioCtx";
import { FontFamilyTokenEditModal } from "./FontFamilyTokenEditModal";
import { GeneralTokenEditModal } from "./GeneralTokenEditModal";
import { ColorTokenPopup } from "./token-controls";

export const TokenEditModal = observer(function TokenEditModal(props: {
  studioCtx: StudioCtx;
  token: StyleToken;
  onClose: () => void;
  autoFocusName?: boolean;
  vsh?: VariantedStylesHelper;
}) {
  const { studioCtx, token, onClose, autoFocusName, vsh } = props;
  return (
    <>
      {token.type === TokenType.Color && (
        <ColorTokenPopup
          studioCtx={studioCtx}
          token={token}
          show={true}
          onClose={onClose}
          autoFocusName={autoFocusName}
          vsh={vsh}
        />
      )}

      {token.type === TokenType.FontFamily && (
        <FontFamilyTokenEditModal
          studioCtx={studioCtx}
          token={token}
          defaultEditingName={autoFocusName}
          onClose={onClose}
          vsh={vsh}
        />
      )}

      {token.type !== TokenType.Color &&
        token.type !== TokenType.FontFamily && (
          <GeneralTokenEditModal
            studioCtx={studioCtx}
            token={token}
            defaultEditingName={autoFocusName}
            onClose={onClose}
            vsh={vsh}
          />
        )}
    </>
  );
});
