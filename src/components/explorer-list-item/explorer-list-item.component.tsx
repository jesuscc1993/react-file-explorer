import './explorer-list-item.component.css';

import React, { FC, MouseEvent } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { FileSystemItem } from '../../types/file-system.types';
import { AppItemIcon } from '../item-icon/item-icon.component';

type Props = {
  item: FileSystemItem;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppExplorerListItem: FC<Props> = ({
  item,
  openItem,
  selectItem,
}) => {
  const { selectedItem, addFavorite } = useAppContext();

  const onItemPress = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    selectItem(item);
  };

  const onFavoritePress = () => addFavorite(item.absolutePath);

  const onOpenPress = () => openItem(item);

  return (
    <div
      className={`explorer-list-item item ${
        item === selectedItem ? 'selected' : ''
      }`}
      key={item.name}
    >
      <ContextMenuTrigger id={`${item.name}-item`}>
        <div className="item-contents" onClick={onItemPress}>
          <AppItemIcon item={item} />

          <div className="label">{item.name}</div>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={`${item.name}-item`}>
        <MenuItem onClick={onOpenPress}>Open</MenuItem>

        {item.isDirectory && (
          <MenuItem onClick={onFavoritePress}>Add to favorites</MenuItem>
        )}
      </ContextMenu>
    </div>
  );
};
