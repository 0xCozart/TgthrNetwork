import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { grommet, Grommet } from 'grommet';
import { authorizeIDX } from 'app/redux/idx/idxSlice';
import { RootState } from 'app/redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import Header from 'app/components/Header/';
import Landing from 'app/Pages/Landing/Landing';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

const App = ({ history, location }: App.Props) => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;
