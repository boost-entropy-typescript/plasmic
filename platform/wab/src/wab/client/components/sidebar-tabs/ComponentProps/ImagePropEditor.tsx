import { Tooltip } from "antd";
import L from "lodash";
import { observer } from "mobx-react-lite";
import React from "react";
import { ImageAsset, isKnownImageAsset } from "../../../../classes";
import { MaybeWrap } from "../../../../commons/components/ReactUtil";
import { ImageAssetType } from "../../../../image-asset-type";
import { isEditable } from "../../../../sites";
import { placeholderImgUrl } from "../../../../urls";
import { StudioCtx } from "../../../studio-ctx/StudioCtx";
import { SidebarModal } from "../../sidebar/SidebarModal";
import {
  ImageAssetOrUrlPicker,
  ImagePreview,
  ImgInfo,
} from "../../style-controls/ImageSelector";
import { PlainLinkButton } from "../../widgets";

export const ImagePropEditor = observer(function ImagePropEditor(props: {
  attr: string;
  studioCtx: StudioCtx;
  value?: ImageAsset | string;
  onPicked: (picked: ImageAsset | string) => void;
  type: ImageAssetType;
  readOnly?: boolean;
}) {
  const { attr, studioCtx, value, onPicked, type, readOnly } = props;
  const asset = isKnownImageAsset(value) ? value : undefined;
  const uri =
    asset && asset.dataUri
      ? asset.dataUri
      : L.isString(value)
      ? value
      : undefined;
  const [pickingImage, setPickingImage] = React.useState(false);

  return (
    <div className={"flex-fill flex-col overflow-hidden"}>
      {!pickingImage && (
        <ImgInfo
          url={uri ?? ""}
          extended
          imagePreview={
            <PlainLinkButton onClick={() => !readOnly && setPickingImage(true)}>
              <ImagePreview
                uri={uri ?? placeholderImgUrl()}
                style={{
                  width: 48,
                  height: 32,
                }}
                className="mr-ch img-thumb-border"
                size="cover"
              />
            </PlainLinkButton>
          }
          filename={
            <MaybeWrap
              cond={asset ? isEditable(studioCtx.site, asset) : false}
              wrapper={(x) =>
                readOnly ? (
                  <Tooltip title="Replace image...">
                    {x as React.ReactElement}
                  </Tooltip>
                ) : (
                  (x as React.ReactElement)
                )
              }
            >
              <PlainLinkButton
                onClick={() => !readOnly && setPickingImage(true)}
              >
                {asset ? asset.name : !readOnly ? "Choose an image..." : ""}
              </PlainLinkButton>
            </MaybeWrap>
          }
        />
      )}
      {pickingImage && (
        <SidebarModal
          title={attr}
          show={true}
          onClose={() => setPickingImage(false)}
        >
          <ImageAssetOrUrlPicker
            studioCtx={studioCtx}
            value={value}
            onPicked={(picked) => {
              onPicked(picked);
              setPickingImage(false);
            }}
            type={type}
            hideCancel={true}
          />
        </SidebarModal>
      )}
    </div>
  );
});
