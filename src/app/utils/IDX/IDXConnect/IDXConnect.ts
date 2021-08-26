import getDidProvider from '../../wallet/wallet';
import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { IDX } from '@ceramicstudio/idx';
import { DID } from 'dids';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import ethProvider from 'app/utils/wallet/ethProvider/ethProvider';

interface CeramicIDX {
  ceramic: CeramicClient | null;
  idx: IDX | null;
}

async function IDXWindow(): Promise<CeramicIDX> {
  if (window.idx && window.ceramic) {
    // console.log({ idx: window.idx });
    return { ceramic: window.ceramic, idx: window.idx };
  } else {
    return { ceramic: null, idx: null };
  }
}
export async function getCeramicIdx(): Promise<CeramicIDX> {
  try {
    // Checks if IDX is already loaded
    const { ceramic, idx } = await IDXWindow();
    if (ceramic && idx) {
      return { ceramic, idx };
    }

    /* 
    If not, load it will connect to the IDX provider through etheruem wallet provider and 3id provider and return the IDX window 
    */

    // Get the wallet provider through ethProvider, opens multi wallet iFrame and returns the provider
    const [address] = await ethProvider.request({ method: 'eth_requestAccounts' });
    const EthProvider = await ethProvider.connect();

    // Get the 3id provider
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(EthProvider, address);
    await threeIdConnect.connect(authProvider);
    const didProvider = await threeIdConnect.getDidProvider();

    // Get the ceramic provider (currently this gateway is the only supporter for 3IDs)
    const ceramicClient = new CeramicClient('127.0.0.1:7007');
    //https://gateway-clay.ceramic.network
    // Get the 3id resolver and key resolver and add them to the ceramic provider (will integrate key resolver later)
    const did = new DID({
      resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramicClient) }
    });

    // Set DID and provider to ceramic client + authentication to write to the ceramic network
    ceramicClient.did = did;
    ceramicClient.did.setProvider(didProvider);
    await ceramicClient.did.authenticate();

    // Create an authenticated IDX object
    const idxClient = new IDX({ ceramic: ceramicClient });

    // Set idx and ceramic to window
    if (idx && ceramic) {
      window.idx = idxClient;
      window.ceramic = ceramicClient;
    }

    return { ceramic: window.ceramic, idx: window.idx };
  } catch (error) {
    console.log('getIDX error: ', error);
    return { ceramic: null, idx: null };
  }
}
