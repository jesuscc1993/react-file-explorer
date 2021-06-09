import './item-icon.component.css';

import React, { FC } from 'react';

import { getFileUrl, getIconForFileType, getItemType } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem, FileSystemItemType } from '../../types/file-system.types';

export enum IconType {
  Preview,
  Thumbnail,
}

type Props = {
  item: FileSystemItem;
  type?: IconType;
  previewsEnabled?: boolean;
};

export const AppItemIcon: FC<Props> = ({ item, type = IconType.Thumbnail }) => {
  const { appSettings } = useAppContext();
  const previewsEnabled =
    appSettings.viewMode === ExplorerViewMode.Grid || type === IconType.Preview;

  const itemType = getItemType(item);

  const isVideo = itemType === FileSystemItemType.Video;
  const isImage = itemType === FileSystemItemType.Image;

  return (
    <div className="item-icon">
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

      {(![FileSystemItemType.Video, FileSystemItemType.Image].includes(
        itemType,
      ) ||
        !previewsEnabled) && (
        <span className="material-icons">{getIconForFileType(itemType)}</span>
      )}
    </div>
  );
};
