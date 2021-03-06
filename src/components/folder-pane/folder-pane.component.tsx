import './folder-pane.component.css';

import React, { FC, useMemo } from 'react';

import { getItemsFilteredByName, getSortedItems } from '../../domain/files.domain';
import { getExplorerStylesfromSettings } from '../../domain/settings.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { FileSystemItem } from '../../types/file-system.types';
import { AppExplorerBreadcrumb } from '../explorer-breadcrumb/explorer-breadcrumb';
import { AppExplorerItem } from '../explorer-item/explorer-item.component';

type Props = {
  path: string;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppFolderPane: FC<Props> = ({ path, openItem, selectItem }) => {
  const { appSettings, filter, items } = useAppContext();

  const sortedItems = useMemo(
    () => getSortedItems(items, appSettings.sortMode),
    [appSettings.sortMode, items],
  );

  const filteredItems = useMemo(
    () => getItemsFilteredByName(sortedItems, filter),
    [filter, sortedItems],
  );

  const styles = useMemo(
    () => getExplorerStylesfromSettings(appSettings),
    [appSettings],
  );

  return (
    <div className="folder-view pane" onClick={() => selectItem()}>
      <AppExplorerBreadcrumb path={path} />

      <div className={`items ${appSettings.viewMode}`}>
        {!!filteredItems?.length &&
          filteredItems.map((item) => (
            <AppExplorerItem
              key={item.name}
              item={item}
              styles={styles}
              openItem={openItem}
              selectItem={selectItem}
            />
          ))}
      </div>
    </div>
  );
};
