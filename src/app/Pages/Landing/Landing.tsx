import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'app/redux/store';
import IdxBasicProfileForm from 'app/components/Forms/IDXBasicProfileForm';
import idxSlice from 'app/redux/idx/idxSlice';

type Props = {};

export default function Landing(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const onSignIn = () => {
    dispatch({ type: 'idx/authorizeIDX', payload: true });
  };

  return (
    <div>
      <h1>Landing</h1>
    </div>
  );
}
