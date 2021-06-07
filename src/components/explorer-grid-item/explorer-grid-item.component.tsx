import React, { FC, MouseEvent } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { useAppContext } from '../../hooks/use-app-context.hook';
import { FileSystemItem } from '../../types/file-system.types';
import { AppItemIcon } from '../item-icon/item-icon.component';

type Props = {
  item: FileSystemItem;
  selectedItem?: FileSystemItem;
  openItem: (item: FileSystemItem) => void;
  selectItem: (item?: FileSystemItem) => void;
};

export const AppExplorerGridItem: FC<Props> = ({
  item,
  selectedItem,
  openItem,
  selectItem,
}) => {
  const { addFavorite } = useAppContext();

  const onItemPress = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    selectItem(item);
  };

  const onFavoritePress = () => addFavorite(item.name);

  const onOpenPress = () => openItem(item);

  return (
    <>
      <div key={item.name}>
        <ContextMenuTrigger id={`${item.name}-item`}>
          <div
            className={`item ${item === selectedItem ? 'selected' : ''}`}
            onClick={onItemPress}
          >
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
    </>
  );
};
