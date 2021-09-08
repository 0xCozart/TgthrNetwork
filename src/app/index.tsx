import React from 'react';
import IDXSignUp from 'app/Pages/SignUp';
import Header from 'app/components/Header';
import { useSelector, connect } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import { Redirect } from 'react-router';

const App = () => {
  const idx = useSelector((state: RootState) => state.idx);

  return (
    <Router>
      <Header />
      <Switch>
        {idx.isAuth && idx.basicProfile ? (
          <Route exact path="/" componenet={Landing} />
        ) : (
          <Route path="/signup" component={IDXSignUp} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
