import { ExplorerViewMode } from '../types/explorer.types';

export const addFavoriteToList = (list: string[], favorite: string) => {
  return list.includes(favorite) ? list : [...list, favorite];
};

export const removeFavoriteFromList = (list: string[], favorite: string) => {
  return list.filter((item) => item !== favorite);
};

export const getOppositeViewMode = (viewMode: ExplorerViewMode) => {
  return viewMode === ExplorerViewMode.Grid
    ? ExplorerViewMode.List
    : ExplorerViewMode.Grid;
};

export const getViewModeIcon = (viewMode: ExplorerViewMode) => {
  return viewMode === ExplorerViewMode.Grid ? 'view_module' : 'view_list';
};
