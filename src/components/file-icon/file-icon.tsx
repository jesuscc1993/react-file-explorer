import './file-icon.css';

import React, { FC } from 'react';

import { getFileType, getFileUrl, getIconForFileType } from '../../domain/files.domain';
import { FileType } from '../../types/file.types';
import { PathStats } from '../../types/path.types';

export enum IconType {
  Preview,
  Thumbnail,
}

type Props = {
  file: PathStats;
  type?: IconType;
};

export const AppFileIcon: FC<Props> = ({ file, type = IconType.Thumbnail }) => {
  const fileType = getFileType(file);

  return (
    <div className="file-icon">
      {fileType === FileType.Video &&
        (type === IconType.Preview ? (
          <video autoPlay controls className="icon" src={getFileUrl(file)} />
        ) : (
          <video className="icon" src={getFileUrl(file)} />
        ))}

      {fileType === FileType.Image && (
        <img alt={file.name} className="icon" src={getFileUrl(file)} />
      )}

      {![FileType.Video, FileType.Image].includes(fileType) && (
        <span className="material-icons">{getIconForFileType(fileType)}</span>
      )}
    </div>
  );
};
