import './folder-pane.component.css';

import React, { FC } from 'react';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem } from '../../types/file-system.types';
import { AppExplorerGridItem } from '../explorer-grid-item/explorer-grid-item.component';
import { AppExplorerListItem } from '../explorer-list-item/explorer-list-item.component';

type Props = {
  name?: string;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppFolderPane: FC<Props> = ({ name, openItem, selectItem }) => {
  const { appSettings, items } = useAppContext();

  const AppItemComponent =
    appSettings.viewMode === ExplorerViewMode.Grid
      ? AppExplorerGridItem
      : AppExplorerListItem;

  return (
    <div className="folder-view pane" onClick={() => selectItem()}>
      <h4 className="pane-title">{name || '\u00A0'}</h4>

      <div className={`items ${appSettings.viewMode}`}>
        {!!items?.length &&
          items.map((item) => (
            <AppItemComponent
              key={item.name}
              item={item}
              openItem={openItem}
              selectItem={selectItem}
            />
          ))}
      </div>
    </div>
  );
};
