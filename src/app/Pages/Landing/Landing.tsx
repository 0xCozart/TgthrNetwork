import { RootState } from 'app/redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

type Props = {};

function Landing(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const idx = useSelector((state: RootState) => state.idx);
  const onSignIn = () => {
    dispatch({ type: 'idx/authorizeIDX', payload: true });
  };

  return (
    <div>
      <h1>Landing {idx?.basicProfile?.name ? idx.basicProfile.name : ''}</h1>
    </div>
  );
}

export default withRouter(Landing);
