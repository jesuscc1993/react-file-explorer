import './folder-pane.component.css';

import React, { FC } from 'react';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem } from '../../types/file-system.types';
import { AppExplorerGridItem } from '../explorer-grid-item/explorer-grid-item.component';
import { AppExplorerListItem } from '../explorer-list-item/explorer-list-item.component';

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
  const { appState } = useAppContext();

  const AppItemComponent =
    appState.viewMode === ExplorerViewMode.Grid
      ? AppExplorerGridItem
      : AppExplorerListItem;

  return (
    <div className="folder-view pane" onClick={() => selectItem()}>
      <h4 className="pane-title">{name || '\u00A0'}</h4>

      <div className={`items ${appState.viewMode}`}>
        {!!items?.length &&
          items.map((item) => (
            <AppItemComponent
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
