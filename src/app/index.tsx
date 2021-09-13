import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import IDXSignUp from 'app/Pages/SignUp';
import Header from 'app/components/Header';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import Landing from './Pages/Landing/Landing';

const App = () => {
  const idx = useSelector((state: RootState) => state.idx);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" component={IDXSignUp} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

export default App;
