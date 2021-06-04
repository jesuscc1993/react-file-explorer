import React, { FC, useState } from 'react';

type AppContextState = {
  leftSidebar: boolean;
  rightSidebar: boolean;
};

type AppContextValue = {
  appState: AppContextState;
  setAppState: (appContextState: AppContextState) => void;
};

const defaultAppContextState: AppContextState = {
  leftSidebar: false,
  rightSidebar: true,
};

const AppContext = React.createContext<AppContextValue>({
  appState: defaultAppContextState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAppState: (_: AppContextState) => {},
});

export const AppContextProvider: FC = ({ children }) => {
  const [appState, setAppState] = useState(defaultAppContextState);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
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
