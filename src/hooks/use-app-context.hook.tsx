import React, { FC, useState } from 'react';

import { settingsKey } from '../constants/storage.constants';
import { addFavoriteToList, removeFavoriteFromList } from '../domain/settings.domain';
import { getStorageValue, setStorageValue } from '../domain/storage.domain';
import { AppSettings, ExplorerViewMode } from '../types/explorer.types';

type AppContextValue = {
  appState: AppSettings;
  addFavorite: (path: string) => void;
  removeFavorite: (path: string) => void;
  setAppState: (appContextState: AppSettings) => void;
};

const defaultAppContextState: AppSettings = {
  favorites: [],
  leftSidebar: true,
  rightSidebar: true,
  viewMode: ExplorerViewMode.Grid,
};

const AppContext = React.createContext<AppContextValue>({
  appState: defaultAppContextState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addFavorite: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFavorite: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAppState: (_: AppSettings) => {},
});

export const AppContextProvider: FC = ({ children }) => {
  const [appState, setAppState] = useState(
    getStorageValue(settingsKey) || defaultAppContextState,
  );

  const addFavorite = (path: string) => {
    _setAppState({
      ...appState,
      favorites: addFavoriteToList(appState.favorites, path),
    });
  };

  const removeFavorite = (path: string) => {
    _setAppState({
      ...appState,
      favorites: removeFavoriteFromList(appState.favorites, path),
    });
  };

  const _setAppState = (newAppState: AppSettings) => {
    setStorageValue(settingsKey, newAppState);
    setAppState(newAppState);
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        addFavorite,
        removeFavorite,
        setAppState: _setAppState,
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
