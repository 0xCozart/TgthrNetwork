import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/store';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { App } from './app';
import { IDX } from '@ceramicstudio/idx';
import Ceramic from '@ceramicnetwork/http-client';
import { grommet, Grommet } from 'grommet';

declare global {
  export interface Window {
    idx: IDX;
    ceramic: Ceramic;
    ethereum: any;
  }
}

// prepare store
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Grommet theme={grommet} full>
          <App />
        </Grommet>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
