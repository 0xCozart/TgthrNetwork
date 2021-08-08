import React from 'react';
import { Route, Switch } from 'react-router';
import { IDXPage } from 'app/Pages/App';

export const App = () => (
  <Switch>
    <Route path="/" component={IDXPage} />
  </Switch>
);
