import './detail-view.css';

import React, { FC } from 'react';

import { formatDate } from '../../domain/dates.domain';
import { getSizeFromBytes } from '../../domain/files.domain';
import { PathStats } from '../../types/path.types';
import { AppFileIcon, IconType } from '../file-icon/file-icon';

type Props = {
  file?: PathStats;
};

export const AppDetailView: FC<Props> = ({ file }) => {
  if (!file) return <></>;

  const { accessTime, changeTime, creationTime, modificationTime, name, size } =
    file;

  return (
    <div className="detail-view sidebar pane">
      {!!name && <h4 className="no-margin-top">{name}</h4>}

      <div className="centered-text">
        <AppFileIcon file={file} type={IconType.Preview} />
        {!!size && <p>{getSizeFromBytes(size)}</p>}
      </div>

      {!!accessTime && (
        <p className="value-pair">
          <span>Accessed:</span>
          <strong>{formatDate(accessTime)}</strong>
        </p>
      )}
      {!!changeTime && (
        <p className="value-pair">
          <span>Changed:</span>
          <strong>{formatDate(changeTime)}</strong>
        </p>
      )}
      {!!creationTime && (
        <p className="value-pair">
          <span>Created:</span>
          <strong>{formatDate(creationTime)}</strong>
        </p>
      )}
      {!!modificationTime && (
        <p className="value-pair">
          <span>Modified:</span>
          <strong>{formatDate(modificationTime)}</strong>
        </p>
      )}
    </div>
  );
};
