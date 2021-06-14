import { MouseEvent, useState } from 'react';

export const useContextMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const hideContextMenu = () => setOpen(false);

  return {
    contextMenuAnchorPoint: anchorPoint,
    isContextMenuOpen: isOpen,
    onContextMenu,
    hideContextMenu,
  };
};
