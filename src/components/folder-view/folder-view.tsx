import './folder-view.css';

import React, { FC } from 'react';

import { PathStats } from '../../types/path.types';
import { AppFileIcon } from '../file-icon/file-icon';

type Props = {
  name?: string;
  files?: PathStats[];
  onFilePress: (file: PathStats) => void;
};

export const AppFolderView: FC<Props> = ({ name, files, onFilePress }) => {
  return (
    <div className="folder-view pane">
      {!!name && <h4 className="no-margin-top">{name}</h4>}

      <div className="files">
        {!!files?.length &&
          files.map((file) => (
            <div
              className="file"
              key={file.name}
              onClick={() => onFilePress(file)}
            >
              <AppFileIcon file={file} />
              <div className="label">{file.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
