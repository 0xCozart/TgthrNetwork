import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { idxAuth } from '../../redux/idx/idxSlice';
import { RootState } from '../../redux/rootReducer';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const IDXPage = ({ history, location }: App.Props) => {
  const idx = useSelector((state: RootState) => state.idx);
  const dispatch = useDispatch();
  console.log({ history, location, idx });

  return (
    <div>
      <h1>HELLOOAk</h1>
      <div>PLEASeSAE</div>
      <button onClick={() => dispatch(idxAuth({ connect: true }))}> IDX </button>
    </div>
  );
};
