import './folder-view.css';

import React, { FC, MouseEvent } from 'react';

import { PathStats } from '../../types/path.types';
import { AppFileIcon } from '../file-icon/file-icon';

type Props = {
  files?: PathStats[];
  name?: string;
  selectedFile?: PathStats;
  onFilePress: (file?: PathStats) => void;
};

export const AppFolderView: FC<Props> = ({
  files,
  name,
  selectedFile,
  onFilePress,
}) => {
  return (
    <div className="folder-view pane" onClick={() => onFilePress()}>
      {!!name && <h4 className="no-margin-top">{name}</h4>}

      <div className="files">
        {!!files?.length &&
          files.map((file) => {
            const onPress = (event: MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              onFilePress(file);
            };

            return (
              <div
                className={`file ${file === selectedFile ? 'selected' : ''}`}
                key={file.name}
                onClick={onPress}
              >
                <AppFileIcon file={file} />
                <div className="label">{file.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
