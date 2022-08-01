import './index.css';
import './theme-dark.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { AppContextProvider } from './hooks/use-app-context.hook';
import { AppExplorerPage } from './pages/explorer/explorer.page';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/explorer/" />
          </Route>
          <Route path="/explorer/">
            <AppExplorerPage />
          </Route>
        </Switch>
      </HashRouter>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Neutralino.init();
