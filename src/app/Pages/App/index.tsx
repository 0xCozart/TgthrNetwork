import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeIDX } from 'app/redux/idx/idxSlice';
import { RootState } from 'app/redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import IdxBasicProfileForm from 'app/components/Form/Form';
import { ipfsGet, ipfsUpload, ipfsGetImage } from 'app/utils/ipfs/ipfsUtils';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

const testData = 'BAKA CHWAUN';
const cid = 'QmSmoLqPWLJMGiT4s2jEcqcbmrQkdLoMkc5u7oTLPoemXF';
const cid2 = 'QmWWtSEjs3RUgMHtmwrTz3Cv7SBF9VXmmhFUVrX4Xdd68y';

export const IDXPage = ({ history, location }: App.Props) => {
  const idx = useSelector((state: RootState) => state.idx);
  const dispatch: AppDispatch = useDispatch();
  console.log({ history, location, idx });

  useEffect(() => {
    (async () => {
      // let file = await ipfsUpload();
      // console.log(file);
    })();
  });

  return (
    <div>
      <h1>HELLOOAk</h1>
      <div>PLEASeSAE</div>
      <button onClick={() => dispatch(authorizeIDX({ connect: true }))}> IDX </button>
      <IdxBasicProfileForm onUpload={ipfsUpload} isAuth={idx.isAuth} />
      {/* <button onClick={() => ipfsGetImage()}> IDX </button> */}
      <div>
        {Object.keys(idx).map((key) => (
          <div key={key}>{idx[key]}</div>
        ))}
      </div>
    </div>
  );
};
