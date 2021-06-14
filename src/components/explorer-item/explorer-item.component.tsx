import './explorer-grid-item.component.css';
import '@szhsin/react-menu/dist/index.css';

import React, { FC, MouseEvent } from 'react';

import {
  ControlledMenu, MenuDivider, MenuItem, MenuRadioGroup, RadioChangeEvent, SubMenu,
} from '@szhsin/react-menu';

import { copyToClipboard } from '../../domain/clipboard.domain';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useContextMenu } from '../../hooks/use-context-menu.hook';
import { ExplorerSortMode, ExplorerStyles, ExplorerViewMode } from '../../types/explorer.types';
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
  const {
    appSettings: { sortMode, viewMode },
    selectedItem,
    addFavorite,
    setSortMode,
  } = useAppContext();

  const {
    contextMenuAnchorPoint,
    isContextMenuOpen,
    onContextMenu,
    hideContextMenu,
  } = useContextMenu();

  const onCopyPathPress = () => {
    copyToClipboard(item.absolutePath).subscribe();
  };

  const onItemPress = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    selectItem(item);
  };

  const onFavoritePress = () => addFavorite(item.absolutePath);

  const onOpenPress = () => openItem(item);

  const onSortModeChange = ({ value }: RadioChangeEvent) => setSortMode(value);

  const itemClass =
    viewMode === ExplorerViewMode.Grid ? 'grid-item' : 'list-item';

  const itemStyles =
    viewMode === ExplorerViewMode.Grid ? styles?.gridItem : styles?.listItem;

  return (
    <>
      <div
        className={`explorer-item item ${itemClass} ${
          item === selectedItem ? 'selected' : ''
        }`}
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
        <SubMenu label="Sort By">
          <MenuRadioGroup value={sortMode} onChange={onSortModeChange}>
            <MenuItem value={ExplorerSortMode.Name}>Name</MenuItem>
            <MenuItem className="bottom-divider" value={ExplorerSortMode.Kind}>
              Kind
            </MenuItem>
            {/* <MenuDivider /> */}
            <MenuItem value={ExplorerSortMode.Accessed}>Date accessed</MenuItem>
            <MenuItem value={ExplorerSortMode.Changed}>Date changed</MenuItem>
            <MenuItem value={ExplorerSortMode.Created}>Date created</MenuItem>
            <MenuItem value={ExplorerSortMode.Modified}>Date modified</MenuItem>
          </MenuRadioGroup>
        </SubMenu>
        <MenuDivider />
        <MenuItem onClick={onCopyPathPress}>Copy as path</MenuItem>
        {item.isDirectory && (
          <MenuItem onClick={onFavoritePress}>Add to favorites</MenuItem>
        )}
      </ControlledMenu>
    </>
  );
};
