import { useEffect } from 'react';
import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';
import { DIDProvider } from '@ceramicnetwork/common';
import getDidProvider from '../../wallet/wallet';
// import { CERAMIC_URL } from '../constant/constants';

declare global {
  export interface Window {
    idx: IDX;
  }
}

const aliases = {
  tgthr: 'tgthr'
};

function useIDX(connect: boolean) {
  // const [auth, setAuth] = useState<boolean>(false);

  // const [idx];
  useEffect(() => {
    if (connect)
      (async () => {
        // const didProvider: DIDProvider | undefined = await getDidProvider();
        // const ceramic = new Ceramic('http://127.0.0.1:7007');
        // console.log({ ceramic, didProvider });
        // if (didProvider) await ceramic.setDIDProvider(didProvider);
        // if (!didProvider) throw new Error('Ethereum Provider not available :(');
        // const idx = new IDX({ ceramic, aliases });
        // if (idx.authenticated) {
        //   window.localStorage.setItem('idx', JSON.stringify(idx));
        //   // setAuth(true);
        //   console.log(window);
        // }
        // if (idx.authenticated) console.log(await idx.get('basicProfile'));
        // setCeramic(await ceram.setDIDProvider(didProvider?.provider));
      })();
  }, [connect]);

  return;
}

export default useIDX;
