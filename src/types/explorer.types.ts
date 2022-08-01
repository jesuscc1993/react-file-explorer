import { CSSProperties } from 'react';

export enum ExplorerViewMode {
  Grid = 'grid',
  List = 'list',
}

export enum ExplorerSortMode {
  Created = 'creationTime',
  Kind = 'kind',
  Modified = 'modificationTime',
  Name = 'name',
}

export enum ExplorerSortDirection {
  Asc = 1,
  Desc = -1,
}

export type AppSettings = {
  favorites: string[];
  iconSize: number;
  labelSize: number;
  leftSidebar: boolean;
  rightSidebar: boolean;
  sortMode: ExplorerSortMode;
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
