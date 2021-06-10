import './explorer-grid-item.component.css';
import '@szhsin/react-menu/dist/index.css';

import React, { FC, MouseEvent } from 'react';

import { ControlledMenu, MenuDivider, MenuItem } from '@szhsin/react-menu';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { useContextMenu } from '../../hooks/use-context-menu.hook';
import { ExplorerStyles, ExplorerViewMode } from '../../types/explorer.types';
import { FileSystemItem } from '../../types/file-system.types';
import { AppItemIcon } from '../item-icon/item-icon.component';

type Props = {
  item: FileSystemItem;
  styles?: ExplorerStyles;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppExplorerItem: FC<Props> = ({
  item,
  styles,
  openItem,
  selectItem,
}) => {
  const { appSettings, selectedItem, addFavorite } = useAppContext();
  const {
    contextMenuAnchorPoint,
    isContextMenuOpen,
    onContextMenu,
    hideContextMenu,
  } = useContextMenu();

  const onItemPress = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    selectItem(item);
  };

  const onFavoritePress = () => addFavorite(item.absolutePath);

  const onOpenPress = () => openItem(item);

  const itemClass =
    appSettings.viewMode === ExplorerViewMode.Grid ? 'grid-item' : 'list-item';

  const itemStyles =
    appSettings.viewMode === ExplorerViewMode.Grid
      ? styles?.gridItem
      : styles?.listItem;

  return (
    <>
      <div
        className={`explorer-item item ${itemClass} ${
          item === selectedItem ? 'selected' : ''
        }`}
        key={item.name}
        style={itemStyles?.itemWrapper}
        onContextMenu={onContextMenu}
      >
        <div className="item-contents" onClick={onItemPress}>
          <AppItemIcon item={item} styles={itemStyles} />

          <div className="label" style={itemStyles?.label}>
            {item.name}
          </div>
        </div>
      </div>

      <ControlledMenu
        anchorPoint={contextMenuAnchorPoint}
        isOpen={isContextMenuOpen}
        onClose={hideContextMenu}
      >
        <MenuItem onClick={onOpenPress}>Open</MenuItem>
        {item.isDirectory && <MenuDivider />}
        {item.isDirectory && (
          <MenuItem onClick={onFavoritePress}>Add to favorites</MenuItem>
        )}
      </ControlledMenu>
    </>
  );
};
