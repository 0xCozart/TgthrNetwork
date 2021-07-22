import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeIDX } from '../../redux/idx/idxSlice';
import { RootState } from '../../redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import IdxBasicProfileForm from 'app/components/Form/Form';
import { ipfsGet, ipfsUpload } from 'app/utils/ipfs/ipfsUtils';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

const testData = 'BAKA CHWAUN';

export const IDXPage = ({ history, location }: App.Props) => {
  const idx = useSelector((state: RootState) => state.idx);
  const dispatch: AppDispatch = useDispatch();
  console.log({ history, location, idx });

  useEffect(() => {
    (async () => {
      ipfsUpload(testData);
    })();
  });

  return (
    <div>
      <h1>HELLOOAk</h1>
      <div>PLEASeSAE</div>
      <button onClick={() => dispatch(authorizeIDX({ connect: true }))}> IDX </button>
      <IdxBasicProfileForm onUpload={ipfsUpload} isAuth={idx.isAuth} />

      <div>
        {Object.keys(idx).map((key) => (
          <div key={key}>{idx[key]}</div>
        ))}
      </div>
    </div>
  );
};
