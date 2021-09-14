import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'app/redux/store';
import { withRouter } from 'react-router-dom';
import IDXBasicProfile from 'app/components/Forms/IDXBasicProfile';

type Props = {};

function Landing(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const onSignIn = () => {
    dispatch({ type: 'idx/authorizeIDX', payload: true });
  };

  return (
    <div>
      <h1>Landing</h1>
      <IDXBasicProfile />
    </div>
  );
}

export default withRouter(Landing);
