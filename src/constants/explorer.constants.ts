import { AppSettings, ExplorerSortMode, ExplorerViewMode } from '../types/explorer.types';

export const appId = process.env.REACT_APP_ID;

export const defaultAppSettings: AppSettings = {
  favorites: [],
  iconSize: 128,
  labelSize: 16,
  leftSidebar: true,
  rightSidebar: true,
  sortMode: ExplorerSortMode.Kind,
  viewMode: ExplorerViewMode.Grid,
};

export const minIconSize = 16;
export const maxIconSize = 256;

export const minLabelSize = 8;
export const maxLabelSize = 32;
