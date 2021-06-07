import './explorer-footer.component.css';

import React, { FC } from 'react';

import { FileSystemItem } from '../../types/file-system.types';

type Props = {
  selectedFile?: FileSystemItem;
};

export const AppExplorerFooter: FC<Props> = ({ selectedFile }) => {
  return (
    <div className="footer-section pane">
      <span>{selectedFile?.absolutePath}</span>
    </div>
  );
};
