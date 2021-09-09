import Ceramic from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { randomBytes } from '@stablelib/random';
import { base64 } from 'multiformats/bases/base64';
import { IDX } from '@ceramicstudio/idx';
import { DID } from 'dids';
import getEthProvider from 'app/utils/wallet/getEthProvider';
import { idxWindow } from '../IDXutils';

export async function getIdx(didHash?: string): Promise<IDX | null> {
  let didProvider;
  try {
    // Checks if IDX is already loaded
    const idx = await idxWindow();
    if (idx) {
      return idx;
    }

    /* 
    If not in window, connect IDX provider through etheruem wallet provider + 3id provider  
    */
    const { addresses, ethProvider } = await getEthProvider();
    if (!addresses || !ethProvider) {
      throw new Error('Please install Metamask to connect to the Ethereum Network');
    }

    // if (!didHash) {
    // let seed = randomBytes(32);
    // const str = new TextDecoder('utf-8').decode(seed);
    // // const str = String.fromCharCode.apply(null, seed as unknown as number[]);
    // console.log({ seed: str });
    // didProvider = new Ed25519Provider(seed);
    // Get the 3id provider
    // } else {
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
    await threeIdConnect.connect(authProvider);
    didProvider = await threeIdConnect.getDidProvider();
    // }

    // Get the ceramic provider (currently this gateway is the only supporter for 3IDs)
    const ceramicClient = new Ceramic('http://localhost:7007');
    //https://ceramic-clay.3boxlabs.com
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
    if (idxClient) {
      window.idx = idxClient;
    }

    // Don't need to export ceramic client since its accessible through idx via `idx.ceramic`
    return idxClient;
  } catch (error) {
    console.log('getIDX error: ', error);
    return null;
  }
}
