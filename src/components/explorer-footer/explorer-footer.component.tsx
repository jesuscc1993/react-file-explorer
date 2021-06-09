import './explorer-footer.component.css';

import React, { FC } from 'react';

import { getSizeFromBytes } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';

export const AppExplorerFooter: FC = () => {
  const { items, selectedItem } = useAppContext();

  const showItems = items?.length;

  return (
    <div className="footer-section pane">
      {showItems && <span>{items?.length} items</span>}

      {showItems && selectedItem && <span>|</span>}

      {selectedItem && (
        <>
          <span>&quot;{selectedItem.absolutePath}&quot;</span>
          <span>{getSizeFromBytes(selectedItem.size)}</span>
        </>
      )}
    </div>
  );
};
