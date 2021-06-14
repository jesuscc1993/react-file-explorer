import React, { FC, useContext, useState } from 'react';

import { defaultAppSettings } from '../constants/explorer.constants';
import { settingsKey } from '../constants/storage.constants';
import { addFavoriteToList, removeFavoriteFromList } from '../domain/settings.domain';
import { getStorageValue, setStorageValue } from '../domain/storage.domain';
import { AppSettings, ExplorerSortMode } from '../types/explorer.types';
import { FileSystemItem } from '../types/file-system.types';

type AppContextValue = {
  appSettings: AppSettings;
  filter: string;
  items: FileSystemItem[];
  selectedItem?: FileSystemItem;
  addFavorite: (path: string) => void;
  removeFavorite: (path: string) => void;
  setAppSettings: (appContextState: AppSettings) => void;
  setFavorites: (paths: string[]) => void;
  setFilter: (filter: string) => void;
  setItems: (items: FileSystemItem[]) => void;
  setSelectedItem: (item?: FileSystemItem) => void;
  setSortMode: (sortMode: ExplorerSortMode) => void;
};

/* eslint-disable @typescript-eslint/no-empty-function */
const AppContext = React.createContext<AppContextValue>({
  appSettings: defaultAppSettings,
  filter: '',
  items: [],
  selectedItem: undefined,
  addFavorite: () => {},
  removeFavorite: () => {},
  setAppSettings: () => {},
  setFavorites: () => {},
  setFilter: () => {},
  setItems: () => {},
  setSelectedItem: () => {},
  setSortMode: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

export const AppContextProvider: FC = ({ children }) => {
  const [appSettings, setAppSettings] = useState(
    getStorageValue(settingsKey) || defaultAppSettings,
  );
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState<FileSystemItem[]>([]);
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

  const setSortMode = (sortMode: ExplorerSortMode) => {
    updateSettings({ ...appSettings, sortMode });
  };

  const updateSettings = (newAppState: AppSettings) => {
    setStorageValue(settingsKey, newAppState);
    setAppSettings(newAppState);
  };

  return (
    <AppContext.Provider
      value={{
        appSettings,
        filter,
        items,
        selectedItem,
        addFavorite,
        removeFavorite,
        setAppSettings: updateSettings,
        setFavorites,
        setFilter,
        setItems,
        setSelectedItem,
        setSortMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
