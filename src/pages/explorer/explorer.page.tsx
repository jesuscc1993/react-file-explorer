import './explorer.page.css';

import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { tap } from 'rxjs/operators';

import { AppAddressBar } from '../../components/address-bar/address-bar';
import { AppDetailView } from '../../components/detail-view/detail-view';
import { AppFolderView } from '../../components/folder-view/folder-view';
import { AppPinsView } from '../../components/pins-view/pins-view';
import { getFolderName } from '../../domain/files.domain';
import { getOs, getStartingPath } from '../../domain/os.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useQueryParams } from '../../hooks/use-query-params.hook';
import { filesService } from '../../services/files.service';
import { PathStats } from '../../types/path.types';

const os = getOs();

export const AppExplorer: FC = () => {
  const history = useHistory();
  const params = useQueryParams();
  const { appState } = useAppContext();

  const path = params.get('path') || getStartingPath(os);

  const [files, setFiles] = useState<PathStats[]>();
  const [selectedFile, setSelectedFile] = useState<PathStats>();

  useEffect(() => {
    setSelectedFile(undefined);
    filesService.getPathFiles(path).pipe(tap(setFiles)).subscribe();
  }, [path]);

  const selectFile = (file?: PathStats) => {
    if (!file) {
      return setSelectedFile(undefined);
    }
    if (file.isDirectory) {
      if (file !== selectedFile) {
        return setSelectedFile(file);
      } else {
        return history.push(`/explorer?path=${file.absolutePath}`);
      }
    }
    if (file.isFile) {
      if (file !== selectedFile) {
        return setSelectedFile(file);
      } else {
        return filesService.openFile(file.absolutePath);
      }
    }
  };

  return (
    <div className="app-explorer">
      <AppAddressBar path={path} />

      <div className="middle-section">
        {appState.leftSidebar && <AppPinsView />}

        <AppFolderView
          files={files}
          name={getFolderName(path)}
          selectedFile={selectedFile}
          onFilePress={selectFile}
        />

        {appState.rightSidebar && <AppDetailView file={selectedFile} />}
      </div>

      <div className="footer-section pane">
        {selectedFile?.absolutePath || 'No selection'}
      </div>
    </div>
  );
};
