import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { grommet, Grommet } from 'grommet';
import { authorizeIDX } from 'app/redux/idx/idxSlice';
import { RootState } from 'app/redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import IdxBasicProfileForm from 'app/components/Forms/IDXBasicProfileForm';
import Header from 'app/components/Header/';
import Landing from 'app/Pages/Landing/Landing';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const IDXPage = ({ history, location }: App.Props) => {
  const [testImage, setTestImage] = useState<string>('');
  const idx = useSelector((state: RootState) => state.idx);
  const dispatch: AppDispatch = useDispatch();
  console.log({ history, location, idx });

  useEffect(() => {
    (async () => {
      // let file = await ipfsUpload();
      // console.log(file);
    })();
  });

  const onRetrieveBasicProfile = (basicProfile: typeof idx.basicProfile) => {
    dispatch({ type: 'UPDATE_BASIC_PROFILE', basicProfile });
  };

  return (
    <Grommet theme={grommet} full>
      <Header />
      <div>
        {idx.isAuth ? null : <Landing />}
        {/* <h1>{idx.basicProfile}</h1>
      <div>PLEASeSAE</div>
      <button onClick={() => dispatch(authorizeIDX({ connect: true }))}> IDX </button>
      <IdxBasicProfileForm onUpload={ipfsUpload} isAuth={true} onRetrieve={onRetrieveBasicProfile} />
      <button
        onClick={async () => {
          const image = await ipfsGetImage('QmWWtSEjs3RUgMHtmwrTz3Cv7SBF9VXmmhFUVrX4Xdd68y');
          if (image) setTestImage(image);
          console.log({ image });
        }}
      >
        IDX
      </button>
      <div>
        <img src={testImage} style={{ height: '100%', width: '100%' }}></img>
      </div>
      <div>
        {Object.keys(idx).map((key) => (
          <div key={key}>{idx[key]}</div>
        ))}
      </div> */}
      </div>
    </Grommet>
  );
};
