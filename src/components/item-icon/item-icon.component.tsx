import './item-icon.component.css';

import React, { FC } from 'react';

import { getFileUrl, getIconForFileType, getItemType } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { ExplorerStyles, ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem, FileSystemItemType } from '../../types/file-system.types';

export enum IconType {
  Preview,
  Thumbnail,
}

type Props = {
  item: FileSystemItem;
  styles?: ExplorerStyles;
  type?: IconType;
  previewsEnabled?: boolean;
};

export const AppItemIcon: FC<Props> = ({
  item,
  styles,
  type = IconType.Thumbnail,
}) => {
  const { appSettings } = useAppContext();
  const previewsEnabled =
    appSettings.viewMode === ExplorerViewMode.Grid || type === IconType.Preview;

  const itemType = getItemType(item);

  const isVideo = itemType === FileSystemItemType.Video;
  const isImage = itemType === FileSystemItemType.Image;

  const hasPreview = [
    FileSystemItemType.Video,
    FileSystemItemType.Image,
  ].includes(itemType);

  return (
    <div className="item-icon" style={styles?.iconWrapper}>
      {previewsEnabled &&
        isVideo &&
        (type === IconType.Preview ? (
          <video autoPlay controls className="icon" src={getFileUrl(item)} />
        ) : (
          <video className="icon" src={getFileUrl(item)} />
        ))}

      {previewsEnabled && isImage && (
        <img alt={item.name} className="icon image" src={getFileUrl(item)} />
      )}

      {(!previewsEnabled || !hasPreview) && (
        <span className="material-icons" style={styles?.icon}>
          {getIconForFileType(itemType)}
        </span>
      )}
    </div>
  );
};
