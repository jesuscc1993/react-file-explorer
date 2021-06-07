import './folder-pane.component.css';

import React, { FC } from 'react';

import { FileSystemItem } from '../../types/file-system.types';
import { AppExplorerGridItem } from '../explorer-grid-item/explorer-grid-item.component';

type Props = {
  items?: FileSystemItem[];
  name?: string;
  selectedItem?: FileSystemItem;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppFolderPane: FC<Props> = ({
  items,
  name,
  selectedItem,
  openItem,
  selectItem,
}) => {
  return (
    <div className="folder-view pane" onClick={() => selectItem()}>
      <h4 className="pane-title">{name || '\u00A0'}</h4>

      <div className="items">
        {!!items?.length &&
          items.map((item) => (
            <AppExplorerGridItem
              key={item.name}
              item={item}
              selectedItem={selectedItem}
              openItem={openItem}
              selectItem={selectItem}
            />
          ))}
      </div>
    </div>
  );
};
