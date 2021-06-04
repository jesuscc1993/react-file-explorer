import './index.css';
import './theme-dark.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { AppContextProvider } from './hooks/use-app-context.hook';
import { AppExplorer } from './pages/explorer/explorer.page';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/explorer/" />
          </Route>
          <Route path="/explorer/">
            <AppExplorer />
          </Route>
        </Switch>
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
