import { AppSettings, ExplorerViewMode } from '../types/explorer.types';

export const appId = process.env.REACT_APP_ID;

export const defaultAppSettings: AppSettings = {
  favorites: [],
  iconSize: 128,
  labelSize: 16,
  leftSidebar: true,
  rightSidebar: true,
  viewMode: ExplorerViewMode.Grid,
};
