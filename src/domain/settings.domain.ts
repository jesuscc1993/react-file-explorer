import { AppSettings, ExplorerStyles, ExplorerViewMode } from '../types/explorer.types';

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

export const getExplorerStylesfromSettings = (appSettings: AppSettings) => {
  return {
    itemWrapper: {
      width: `${appSettings.iconSize + 18}px`,
    },
    iconWrapper: {
      height: `${appSettings.iconSize}px`,
      width: `${appSettings.iconSize}px`,
    },
    icon: {
      fontSize: `${appSettings.iconSize}px`,
      lineHeight: `${appSettings.iconSize}px`,
    },
    label: {
      fontSize: `${appSettings.labelSize}px`,
      lineHeight: `${appSettings.labelSize * 1.25}px`,
    },
  } as ExplorerStyles;
};
