import React, { FC } from 'react';

import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

import { getFolderName } from '../../domain/files.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useContextMenu } from '../../hooks/use-context-menu.hook';

type Props = {
  path: string;
  onPathPress: (path: string) => void;
};

export const AppFavoriteItem: FC<Props> = ({ path, onPathPress }) => {
  const { removeFavorite } = useAppContext();
  const {
    contextMenuAnchorPoint,
    isContextMenuOpen,
    onContextMenu,
    hideContextMenu,
  } = useContextMenu();

  const onItemPress = () => onPathPress(path);
  const onUnfavoriteItemPress = () => removeFavorite(path);

  return (
    <>
      <div
        className="favorite"
        onClick={onItemPress}
        onContextMenu={onContextMenu}
      >
        <span>{getFolderName(path)}</span>
      </div>

      <ControlledMenu
        anchorPoint={contextMenuAnchorPoint}
        isOpen={isContextMenuOpen}
        onClose={hideContextMenu}
      >
        <MenuItem onClick={onUnfavoriteItemPress}>
          Remove from favorites
        </MenuItem>
      </ControlledMenu>
    </>
  );
};
