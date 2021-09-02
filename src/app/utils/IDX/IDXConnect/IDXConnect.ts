import Ceramic from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { IDX } from '@ceramicstudio/idx';
import { DID } from 'dids';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import getEthProvider from 'app/utils/wallet/getEthProvider';
import { ceramicIdxWindow } from '../IDXutils';
import { CeramicIDX } from '../idx';

export async function getCeramicIdx(): Promise<CeramicIDX> {
  try {
    // Checks if IDX is already loaded
    const { ceramic, idx } = await ceramicIdxWindow();
    if (ceramic && idx) {
      return { ceramic, idx };
    }

    /* 
    If not, load it will connect to the IDX provider through etheruem wallet provider and 3id provider and return the IDX window 
    */
    const { addresses, ethProvider } = await getEthProvider();
    if (!addresses || !ethProvider) {
      throw new Error('Please install Metamask to connect to the Ethereum Network');
    }

    // Get the 3id provider
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
    await threeIdConnect.connect(authProvider);
    const didProvider = await threeIdConnect.getDidProvider();

    // Get the ceramic provider (currently this gateway is the only supporter for 3IDs)
    const ceramicClient = new Ceramic('https://gateway-clay.ceramic.network');
    //https://gateway-clay.ceramic.network
    // Get the 3id resolver and key resolver and add them to the ceramic provider (will integrate key resolver later)
    const did = new DID({
      provider: didProvider,
      resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramicClient) }
    });

    // Set DID and provider to ceramic client + authentication to write to the ceramic network
    ceramicClient.did = did;
    ceramicClient.did.setProvider(didProvider);
    await ceramicClient.did.authenticate();

    // Create an authenticated IDX object
    const idxClient = new IDX({ ceramic: ceramicClient });

    // Set idx and ceramic to window
    if (idxClient && ceramicClient) {
      window.idx = idxClient;
      window.ceramic = ceramicClient;
    }

    return { ceramic: ceramicClient, idx: idxClient };
  } catch (error) {
    console.log('getIDX error: ', error);
    return { ceramic: null, idx: null };
  }
}
