import { ImageAsset, ProjectDependency } from "@/wab/classes";
import { AppCtx } from "@/wab/client/app-ctx";
import ListItem from "@/wab/client/components/ListItem";
import { MenuBuilder } from "@/wab/client/components/menu-builder";
import { DraggableInsertable } from "@/wab/client/components/studio/add-drawer/DraggableInsertable";
import {
  ImagePaster,
  ImagePreview,
  ImageUploader,
} from "@/wab/client/components/style-controls/ImageSelector";
import { Matcher } from "@/wab/client/components/view-common";
import {
  LeftIconsSectionTooltip,
  LeftImagesSectionTooltip,
} from "@/wab/client/components/widgets/DetailedTooltips";
import { Icon } from "@/wab/client/components/widgets/Icon";
import { SimpleTextbox } from "@/wab/client/components/widgets/SimpleTextbox";
import { AddItemType } from "@/wab/client/definitions/insertables";
import {
  maybeUploadImage,
  readAndSanitizeFileAsImage,
  ResizableImage,
} from "@/wab/client/dom-utils";
import ImageBlockIcon from "@/wab/client/plasmic/plasmic_kit/PlasmicIcon__ImageBlock";
import PlasmicLeftImagesPanel from "@/wab/client/plasmic/plasmic_kit/PlasmicLeftImagesPanel";
import { StudioCtx, useStudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { ViewCtx } from "@/wab/client/studio-ctx/view-ctx";
import { ImageAssetType } from "@/wab/image-asset-type";
import { extractImageAssetUsages } from "@/wab/image-assets";
import { ImageUploadResponse } from "@/wab/shared/ApiSchema";
import { imageDataUriToBlob } from "@/wab/shared/data-urls";
import { Menu } from "antd";
import { orderBy } from "lodash";
import { observer } from "mobx-react-lite";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { isHostLessPackage } from "src/wab/sites";
import { FindReferencesModal } from "./FindReferencesModal";
import { useDepFilterButton } from "./left-panel-utils";
import { SidebarModal } from "./SidebarModal";
import { ItemOrGroup, VirtualGroupedList } from "./VirtualGroupedList";

type ImageAssetTypeExpanded = {
  [ImageAssetType.Icon]: boolean;
  [ImageAssetType.Picture]: boolean;
};

export const ImageAssetsPanel = observer(function ImageAssetsPanel() {
  const studioCtx = useStudioCtx();
  const [query, setQuery] = React.useState("");
  const { filterDeps, filterProps } = useDepFilterButton({
    studioCtx,
    deps: studioCtx.site.projectDependencies.filter(
      (dep) => dep.site.imageAssets.length > 0
    ),
  });
  const readOnly = studioCtx.getLeftTabPermission("images") === "readable";

  const matcher = new Matcher(query);

  const [editAsset, setEditAsset] = React.useState<ImageAsset | undefined>(
    undefined
  );

  const [justAdded, setJustAdded] = React.useState<ImageAsset | undefined>(
    undefined
  );

  const [findReferenceAsset, setFindReferenceAsset] = React.useState<
    ImageAsset | undefined
  >(undefined);

  const [isImageAssetTypeExpanded, setIsImageAssetTypeExpanded] =
    React.useState<ImageAssetTypeExpanded>({
      [ImageAssetType.Icon]: true,
      [ImageAssetType.Picture]: true,
    });

  const addAsset = async (type: ImageAssetType) => {
    return studioCtx.changeUnsafe(() => {
      const asset = studioCtx.tplMgr().addImageAsset({
        type,
      });

      setJustAdded(asset);
      setEditAsset(asset);
    });
  };

  const onSelect = (asset: ImageAsset) => {
    setEditAsset(asset);
  };

  const onFindReferences = (asset: ImageAsset) => {
    setFindReferenceAsset(asset);
  };

  const onCollapseStateChange = (type: ImageAssetType) => () => {
    setIsImageAssetTypeExpanded((state) => ({
      ...state,
      [type]: !state[type],
    }));
  };

  const imageAssetsSection = (type: ImageAssetType) => {
    if (!isImageAssetTypeExpanded[type]) {
      return null;
    }

    const editableAssets = new Set(studioCtx.site.imageAssets);

    const makeAssetsItems = (assets: ImageAsset[]) => {
      assets = assets.filter(
        (asset) =>
          asset.type === type &&
          (matcher.matches(asset.name) || justAdded === asset)
      );
      assets = orderBy(assets, (asset) => asset.name);
      return assets.map((asset) => ({
        type: "item" as const,
        item: asset,
        key: asset.uuid,
      }));
    };

    const makeDepsItems = (deps: ProjectDependency[]) => {
      deps = deps.filter(
        (dep) => filterDeps.length === 0 || filterDeps.includes(dep)
      );
      deps = orderBy(deps, (dep) =>
        studioCtx.projectDependencyManager.getNiceDepName(dep)
      );
      return deps.map((dep) => ({
        type: "group" as const,
        key: dep.uuid,
        group: dep,
        items: makeAssetsItems(dep.site.imageAssets),
        defaultCollapsed: true,
      }));
    };

    const items: ItemOrGroup<ProjectDependency, ImageAsset>[] = [
      ...(filterDeps.length === 0
        ? [...makeAssetsItems(studioCtx.site.imageAssets)]
        : []),
      ...makeDepsItems(
        studioCtx.site.projectDependencies.filter(
          (d) => !isHostLessPackage(d.site)
        )
      ),
      ...makeDepsItems(
        studioCtx.site.projectDependencies.filter((d) =>
          isHostLessPackage(d.site)
        )
      ),
    ];
    return (
      <VirtualGroupedList
        items={items}
        renderItem={(asset) => (
          <ImageAssetControl
            key={asset.uuid}
            studioCtx={studioCtx}
            asset={asset}
            matcher={matcher}
            readOnly={readOnly || !editableAssets.has(asset)}
            onFindReferences={() => onFindReferences(asset)}
            onClick={
              editableAssets.has(asset) ? () => onSelect(asset) : undefined
            }
          />
        )}
        itemHeight={32}
        renderGroupHeader={(dep) =>
          `Imported from "${studioCtx.projectDependencyManager.getNiceDepName(
            dep
          )}"`
        }
        headerHeight={50}
        hideEmptyGroups
        forceExpandAll={matcher.hasQuery() || filterDeps.length > 0}
      />
    );
  };

  return (
    <>
      <PlasmicLeftImagesPanel
        compact={studioCtx.site.imageAssets.length >= 5}
        leftSearchPanel={{
          searchboxProps: {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            autoFocus: true,
          },
          filterProps,
        }}
        newIconButton={
          readOnly
            ? { render: () => null }
            : {
                onClick: async () => addAsset(ImageAssetType.Icon),
              }
        }
        iconsContent={{
          children: imageAssetsSection(ImageAssetType.Icon),
        }}
        iconInfo={{
          tooltip: <LeftIconsSectionTooltip />,
        }}
        iconsHeader={{
          isExpanded: isImageAssetTypeExpanded[ImageAssetType.Icon],
          onExpandClick: onCollapseStateChange(ImageAssetType.Icon),
        }}
        newImageButton={
          readOnly
            ? { render: () => null }
            : {
                onClick: () => addAsset(ImageAssetType.Picture),
              }
        }
        imagesContent={{
          children: imageAssetsSection(ImageAssetType.Picture),
        }}
        imageInfo={{
          tooltip: <LeftImagesSectionTooltip />,
        }}
        imagesHeader={{
          isExpanded: isImageAssetTypeExpanded[ImageAssetType.Picture],
          onExpandClick: onCollapseStateChange(ImageAssetType.Picture),
        }}
      />

      {editAsset && (
        <ImageAssetSidebarPopup
          studioCtx={studioCtx}
          asset={editAsset}
          onClose={() => {
            setEditAsset(undefined);
            setJustAdded(undefined);
          }}
          autoFocusTitle={true}
        />
      )}

      {findReferenceAsset && (
        <FindReferencesModal
          studioCtx={studioCtx}
          displayName={findReferenceAsset.name}
          icon={
            <Icon
              icon={ImageBlockIcon}
              className="mixin-fg custom-svg-icon--lg monochrome-exempt"
            />
          }
          usageSummary={
            extractImageAssetUsages(studioCtx.site, findReferenceAsset)[1]
          }
          onClose={() => {
            setFindReferenceAsset(undefined);
          }}
        />
      )}
    </>
  );
});

const ImageAssetControl = observer(function ImageAssetControl(props: {
  studioCtx: StudioCtx;
  asset: ImageAsset;
  matcher: Matcher;
  readOnly?: boolean;
  isDragging?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  onFindReferences: () => void;
  onClick?: () => void;
}) {
  const {
    studioCtx,
    asset,
    matcher,
    readOnly,
    isDragging,
    dragHandleProps,
    onFindReferences,
    onClick,
  } = props;
  const renderMenu = () => {
    const builder = new MenuBuilder();
    builder.genSection(undefined, (push) => {
      push(
        <Menu.Item key="references" onClick={onFindReferences}>
          Find all references
        </Menu.Item>
      );
      if (!readOnly) {
        push(
          <Menu.Item
            key="delete"
            onClick={() => studioCtx.siteOps().tryDeleteImageAsset(asset)}
          >
            Delete
          </Menu.Item>
        );
      }
    });
    return builder.build({
      onMenuClick: (e) => e.domEvent.stopPropagation(),
      menuName: "image-asset-item-menu",
    });
  };
  const size =
    asset.type === ImageAssetType.Picture && !!asset.width && !!asset.height
      ? `${Math.round(asset.width)} × ${Math.round(asset.height)}`
      : undefined;
  return (
    <DraggableInsertable
      sc={studioCtx}
      spec={{
        key: asset.uuid,
        label: asset.name,
        factory: (vc: ViewCtx) => {
          return vc.variantTplMgr().mkTplImage({ asset });
        },
        icon: <Icon icon={ImageBlockIcon} />,
        type: AddItemType.tpl,
      }}
    >
      <ListItem
        isDragging={isDragging}
        isDraggable={!readOnly}
        icon={
          <ImagePreview
            uri={asset.dataUri || undefined}
            className="mr-ch"
            style={{
              width: 28,
              height: 28,
            }}
          />
        }
        dragHandleProps={dragHandleProps}
        menu={renderMenu}
        onClick={onClick}
        rightContent={size}
        hasRightContents={!!size}
      >
        {matcher.boldSnippets(asset.name)}
      </ListItem>
    </DraggableInsertable>
  );
});

export const ImageAssetSidebarPopup = observer(
  function ImageAssetSidebarPopup(props: {
    studioCtx: StudioCtx;
    asset: ImageAsset;
    onClose: () => void;
    autoFocusTitle?: boolean;
  }) {
    const { studioCtx, asset, onClose, autoFocusTitle } = props;

    const handleUploaded = async (image: ResizableImage, file?: File) => {
      const { imageResult, opts } = await studioCtx.app.withSpinner(
        (async () => {
          return await maybeUploadImage(
            studioCtx.appCtx,
            image,
            asset.type as ImageAssetType,
            file
          );
        })()
      );
      if (!imageResult || !opts) {
        return;
      }
      return studioCtx.change(({ success }) => {
        studioCtx.siteOps().updateImageAsset(asset, imageResult);
        if (
          file &&
          (asset.name.startsWith("image") || asset.name.startsWith("icon"))
        ) {
          studioCtx.tplMgr().renameImageAsset(asset, file.name);
        }
        return success();
      });
    };

    return (
      <SidebarModal
        title={
          <>
            <Icon
              icon={ImageBlockIcon}
              className="mr-sm mixin-fg custom-svg-icon--lg"
            />

            <SimpleTextbox
              defaultValue={asset.name}
              onValueChange={(name) =>
                studioCtx.changeUnsafe(() =>
                  studioCtx.tplMgr().renameImageAsset(asset, name)
                )
              }
              placeholder={"(unnamed asset)"}
              autoFocus={autoFocusTitle}
              selectAllOnFocus={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onClose();
                }
              }}
              fontSize="xlarge"
              fontStyle="bold"
            />
          </>
        }
        show={true}
        onClose={onClose}
      >
        <div>
          {asset.dataUri && (
            <>
              <ImagePreview
                uri={asset.dataUri}
                style={{
                  height: 200,
                }}
                size="contain"
                showCheckboard={true}
              />
            </>
          )}

          <div className="panel-content dimfg flex-col">
            <div className="mb-sm">Upload a new image</div>
            <ImageUploader
              accept={
                asset.type === ImageAssetType.Picture
                  ? ".gif,.jpg,.jpeg,.png,.tif,.svg"
                  : ".svg"
              }
              onUploaded={handleUploaded}
            />

            <div className="mv-sm">or paste a new image from clipboard</div>
            <ImagePaster onPasted={handleUploaded} />
          </div>
        </div>
      </SidebarModal>
    );
  }
);

export const IMAGE_ACCEPT = ".gif,.jpg,.jpeg,.png,.tif,.svg,.webp";
export async function promptFileUpload(
  appCtx: AppCtx,
  opts?: {
    accept?: string;
  }
) {
  return new Promise<ImageUploadResponse | undefined>((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", opts?.accept ?? IMAGE_ACCEPT);
    input.classList.add("display-none");
    document.body.appendChild(input);
    const cleanup = () => {
      document.body.removeChild(input);
    };
    input.addEventListener("change", async () => {
      if (input.files && input.files[0]) {
        try {
          const image = await readAndSanitizeFileAsImage(input.files[0]);
          if (!image) {
            reject(new Error("Invalid image"));
          } else {
            const blob = imageDataUriToBlob(image.url);
            const uploaded = await appCtx.api.uploadImageFile({
              imageFile: blob,
            });
            resolve(uploaded);
          }
        } catch (err) {
          reject(err);
        } finally {
          cleanup();
        }
      }
    });
    input.addEventListener("cancel", () => {
      resolve(undefined);
      cleanup();
    });
    input.click();
  });
}
