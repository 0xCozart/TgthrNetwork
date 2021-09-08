import React from 'react';
import { IDXPage } from 'app/Pages/App';
import IDXSignUp from 'app/Pages/SignUp';
import Header from 'app/components/Header';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';

export const App = () => {
  const idx = useSelector((state: RootState) => state.idx);
  if (!idx.isAuth) {
  }

  return (
    <Router>
      <Header />
      <Switch>
        {idx.isAuth ? (
          <Route path="/signup">
            <Landing />
          </Route>
        ) : (
          <Route path="/" component={IDXSignUp} />
        )}
      </Switch>
    </Router>
  );
};
