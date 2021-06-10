import './folder-pane.component.css';

import React, { FC, useMemo } from 'react';

import { getExplorerStylesfromSettings } from '../../domain/settings.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem } from '../../types/file-system.types';
import { AppExplorerBreadcrumb } from '../explorer-breadcrumb/explorer-breadcrumb';
import { AppExplorerGridItem } from '../explorer-grid-item/explorer-grid-item.component';
import { AppExplorerListItem } from '../explorer-list-item/explorer-list-item.component';

type Props = {
  path: string;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppFolderPane: FC<Props> = ({ path, openItem, selectItem }) => {
  const { appSettings, items } = useAppContext();

  const AppItemComponent = useMemo(
    () =>
      appSettings.viewMode === ExplorerViewMode.Grid
        ? AppExplorerGridItem
        : AppExplorerListItem,
    [appSettings.viewMode],
  );

  const styles = useMemo(
    () => getExplorerStylesfromSettings(appSettings),
    [appSettings],
  );

  return (
    <div className="folder-view pane" onClick={() => selectItem()}>
      <AppExplorerBreadcrumb path={path} />

      <div className={`items ${appSettings.viewMode}`}>
        {!!items?.length &&
          items.map((item) => (
            <AppItemComponent
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
