import './item-icon.component.css';

import React, { FC } from 'react';

import {
  getFileUrl,
  getIconForFileType,
  getItemType,
} from '../../domain/files.domain';
import {
  FileSystemItem,
  FileSystemItemType,
} from '../../types/file-system.types';

export enum IconType {
  Preview,
  Thumbnail,
}

type Props = {
  item: FileSystemItem;
  type?: IconType;
};

export const AppItemIcon: FC<Props> = ({ item, type = IconType.Thumbnail }) => {
  const itemType = getItemType(item);

  const isVideo = itemType === FileSystemItemType.Video;
  const isImage = itemType === FileSystemItemType.Image;

  return (
    <div className="item-icon">
      {isVideo &&
        (type === IconType.Preview ? (
          <video autoPlay controls className="icon" src={getFileUrl(item)} />
        ) : (
          <video className="icon" src={getFileUrl(item)} />
        ))}

      {isImage && (
        <img alt={item.name} className="icon image" src={getFileUrl(item)} />
      )}

      {![FileSystemItemType.Video, FileSystemItemType.Image].includes(
        itemType,
      ) && (
        <span className="material-icons">{getIconForFileType(itemType)}</span>
      )}
    </div>
  );
};
