import './explorer.css';

import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { tap } from 'rxjs/operators';

import { getFolderName } from '../../domain/files.domain';
import { getOs, getStartingPath } from '../../domain/os.domain';
import { useQueryParams } from '../../hooks/use-query-params';
import { filesService } from '../../services/files.service';
import { PathStats } from '../../types/path.types';
import { AppAddressBar } from '../address-bar/address-bar';
import { AppDetailView } from '../detail-view/detail-view';
import { AppFolderView } from '../folder-view/folder-view';
import { AppPinsView } from '../pins-view/pins-view';

const os = getOs();

export const AppExplorer: FC = () => {
  const history = useHistory();
  const params = useQueryParams();

  const path = params.get('path') || getStartingPath(os);

  const [files, setFiles] = useState<PathStats[]>();
  const [selectedFile, setSelectedFile] = useState<PathStats>();

  useEffect(() => {
    setSelectedFile(undefined);
    filesService.getPathFiles(path).pipe(tap(setFiles)).subscribe();
  }, [path]);

  const selectFile = (file: PathStats) => {
    if (file.isDirectory) {
      return history.push(`/explorer?path=${file.absolutePath}`);
    }
    if (file.isFile) {
      if (file !== selectedFile) {
        setSelectedFile(file);
      } else {
        filesService.openFile(file.absolutePath);
      }
    }
  };

  return (
    <div className="app-explorer">
      <AppAddressBar path={path} />

      <div className="flex flex-1">
        <AppPinsView />

        <AppFolderView
          name={getFolderName(path)}
          files={files}
          onFilePress={selectFile}
        />

        <AppDetailView file={selectedFile} />
      </div>

      {!!selectedFile && (
        <div className="pane">{selectedFile?.absolutePath}</div>
      )}

      {/* <div classNam e="pane">OS: {os}</div> */}
    </div>
  );
};
