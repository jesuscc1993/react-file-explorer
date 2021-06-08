export enum ExplorerViewMode {
  Grid = 'grid',
  List = 'list',
}

export type AppSettings = {
  leftSidebar: boolean;
  rightSidebar: boolean;
  favorites: string[];
  viewMode: ExplorerViewMode;
};
