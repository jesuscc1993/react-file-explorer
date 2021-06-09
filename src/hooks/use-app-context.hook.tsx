import React, { FC, useState } from 'react';

import { settingsKey } from '../constants/storage.constants';
import { addFavoriteToList, removeFavoriteFromList } from '../domain/settings.domain';
import { getStorageValue, setStorageValue } from '../domain/storage.domain';
import { AppSettings, ExplorerViewMode } from '../types/explorer.types';
import { FileSystemItem } from '../types/file-system.types';

const defaultAppSettings: AppSettings = {
  favorites: [],
  iconSize: 128,
  labelSize: 16,
  leftSidebar: true,
  rightSidebar: true,
  viewMode: ExplorerViewMode.Grid,
};

type AppContextValue = {
  appSettings: AppSettings;
  items?: FileSystemItem[];
  selectedItem?: FileSystemItem;
  addFavorite: (path: string) => void;
  removeFavorite: (path: string) => void;
  setAppSettings: (appContextState: AppSettings) => void;
  setFavorites: (paths: string[]) => void;
  setItems: (items: FileSystemItem[]) => void;
  setSelectedItem: (item?: FileSystemItem) => void;
};

/* eslint-disable @typescript-eslint/no-empty-function */
const AppContext = React.createContext<AppContextValue>({
  appSettings: defaultAppSettings,
  items: undefined,
  selectedItem: undefined,
  addFavorite: () => {},
  removeFavorite: () => {},
  setAppSettings: () => {},
  setFavorites: () => {},
  setItems: () => {},
  setSelectedItem: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

export const AppContextProvider: FC = ({ children }) => {
  const [appSettings, setAppSettings] = useState(
    getStorageValue(settingsKey) || defaultAppSettings,
  );
  const [items, setItems] = useState<FileSystemItem[]>();
  const [selectedItem, setSelectedItem] = useState<FileSystemItem>();

  const addFavorite = (path: string) => {
    setFavorites(addFavoriteToList(appSettings.favorites, path));
  };

  const removeFavorite = (path: string) => {
    setFavorites(removeFavoriteFromList(appSettings.favorites, path));
  };

  const setFavorites = (favorites: string[]) => {
    updateSettings({ ...appSettings, favorites });
  };

  const updateSettings = (newAppState: AppSettings) => {
    setStorageValue(settingsKey, newAppState);
    setAppSettings(newAppState);
  };

  return (
    <AppContext.Provider
      value={{
        appSettings,
        items,
        selectedItem,
        addFavorite,
        removeFavorite,
        setAppSettings: updateSettings,
        setFavorites,
        setItems,
        setSelectedItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
