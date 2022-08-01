import './detail-pane.component.css';

import React, { FC } from 'react';

import { formatDate } from '../../domain/dates.domain';
import { getSizeFromBytes } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { AppItemIcon, IconType } from '../item-icon/item-icon.component';

export const AppDetailPane: FC = () => {
  const { selectedItem } = useAppContext();

  if (!selectedItem) return <div className="detail-view sidebar pane"></div>;

  const { creationTime, modificationTime, name, size } = selectedItem;

  return (
    <div className="detail-view sidebar pane">
      {!!name && <h4 className="pane-title">{name}</h4>}

      <div className="centered-text">
        <AppItemIcon item={selectedItem} type={IconType.Preview} />
        {!!size && <p>{getSizeFromBytes(size)}</p>}
      </div>

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
