import { CSSProperties } from 'react';

export enum ExplorerViewMode {
  Grid = 'grid',
  List = 'list',
}

export type AppSettings = {
  favorites: string[];
  iconSize: number;
  labelSize: number;
  leftSidebar: boolean;
  rightSidebar: boolean;
  viewMode: ExplorerViewMode;
};

export type ExplorerItemStyles = {
  icon?: CSSProperties;
  iconWrapper?: CSSProperties;
  itemWrapper?: CSSProperties;
  label?: CSSProperties;
};

export type ExplorerStyles = {
  gridItem?: ExplorerItemStyles;
  listItem?: ExplorerItemStyles;
};
