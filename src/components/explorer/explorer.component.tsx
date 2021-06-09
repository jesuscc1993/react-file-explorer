import './explorer.component.css';

import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import { tap } from 'rxjs/operators';

import { getFolderName } from '../../domain/files.domain';
import { getOs, getStartingPath } from '../../domain/os.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useQueryParams } from '../../hooks/use-query-params.hook';
import { fileSystemService } from '../../services/file-system.service';
import { FileSystemItem } from '../../types/file-system.types';
import { AppDetailPane } from '../detail-pane/detail-pane.component';
import { AppExplorerFooter } from '../explorer-footer/explorer-footer.component';
import { AppExplorerHeader } from '../explorer-header/explorer-header.component';
import { AppFavoritesPane } from '../favorites-pane/favorites-pane.component';
import { AppFolderPane } from '../folder-pane/folder-pane.component';

const os = getOs();

export const AppExplorer: FC = () => {
  const history = useHistory();
  const params = useQueryParams();
  const { appSettings, selectedItem, setItems, setSelectedItem } =
    useAppContext();

  const path = params.get('path') || '';

  useEffect(() => {
    if (path) {
      setSelectedItem(undefined);
      fileSystemService.getPathItems(path).pipe(tap(setItems)).subscribe();
    } else {
      openDirectory(getStartingPath(os));
    }
  }, [path]);

  const selectItem = (item?: FileSystemItem) => {
    if (!item) {
      return setSelectedItem(undefined);
    }

    if (item !== selectedItem) {
      setSelectedItem(item);
    } else {
      openItem(item);
    }
  };

  const openItem = (item: FileSystemItem) => {
    (item.isDirectory ? openDirectory : openFile)(item.absolutePath);
  };

  const openDirectory = (path: string) => {
    history.push(`/explorer?path=${path}`);
  };

  const openFile = (path: string) => {
    fileSystemService.openFile(path);
  };

  return (
    <div className="app-explorer">
      <AppExplorerHeader />

      <div className="middle-section">
        {appSettings.leftSidebar && (
          <AppFavoritesPane onPathPress={openDirectory} />
        )}

        <AppFolderPane
          name={getFolderName(path)}
          openItem={openItem}
          selectItem={selectItem}
        />

        {appSettings.rightSidebar && <AppDetailPane />}
      </div>

      <AppExplorerFooter />
    </div>
  );
};
