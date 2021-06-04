import './index.css';
import './theme-dark.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AppExplorer } from './components/explorer/explorer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/explorer/">
          <AppExplorer />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
