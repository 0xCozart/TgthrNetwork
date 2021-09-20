import IDXBasicProfile from 'app/components/Forms/IDXBasicProfile';
import { AppDispatch } from 'app/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

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
