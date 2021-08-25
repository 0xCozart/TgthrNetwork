import { IDX } from '@ceramicstudio/idx';
import CeramicClient from '@ceramicnetwork/http-client';
import { CeramicApi } from '@ceramicnetwork/common/lib/ceramic-api';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { DID } from 'dids';
import getDidProvider from '../../wallet/wallet';

interface IDXFound {
  hasIDX: boolean;
  idxWindow: IDX | null;
}

async function IDXWindow(): Promise<IDXFound> {
  if (window.idx) {
    console.log({ idx: window.idx });
    return { hasIDX: true, idxWindow: window.idx };
  } else {
    return { hasIDX: false, idxWindow: null };
  }
}

async function IDXConnect(): Promise<null | IDX> {
  try {
    const { hasIDX, idxWindow } = await IDXWindow();
    if (hasIDX) return idxWindow;

    // establishes connection to ceramic node
    const ceramic: CeramicClient = new CeramicClient('https://ceramic-clay.3boxlabs.com');
    if (!ceramic) throw new Error('Could not connect to Ceramic node.');

    // Gets DID provider from users ethereum wallet
    const didProvider = await getDidProvider();
    if (!didProvider) {
      console.error('Ethereum Provider not available.');
      return null;
    }
    // await ceramic.did?.setProvider(didProvider);
    // await ceramic.did?.authenticate();

    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic)
    };
    const did = new DID({ provider: didProvider, resolver });

    // sets ceramic client to users DID for authentication
    await ceramic.setDID(did);
    await ceramic.did?.authenticate();

    // Retrieves users IDX
    window.idx = new IDX({ ceramic: ceramic });

    return window.idx;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default IDXConnect;
