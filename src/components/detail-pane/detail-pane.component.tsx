import './detail-pane.component.css';

import React, { FC } from 'react';

import { formatDate } from '../../domain/dates.domain';
import { getSizeFromBytes } from '../../domain/files.domain';
import { FileSystemItem } from '../../types/file-system.types';
import { AppItemIcon, IconType } from '../item-icon/item-icon.component';

type Props = {
  item?: FileSystemItem;
};

export const AppDetailPane: FC<Props> = ({ item }) => {
  if (!item) return <div className="detail-view sidebar pane"></div>;

  const { accessTime, changeTime, creationTime, modificationTime, name, size } =
    item;

  return (
    <div className="detail-view sidebar pane">
      {!!name && <h4 className="pane-title">{name}</h4>}

      <div className="centered-text">
        <AppItemIcon item={item} type={IconType.Preview} />
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
