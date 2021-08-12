import { IDX } from '@ceramicstudio/idx';
import Ceramic from '@ceramicnetwork/http-client';
import { DIDProvider } from '@ceramicnetwork/common';
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

    // Gets DID provider from users blockchain wallet
    const didProvider = await getDidProvider();
    if (!didProvider) throw new Error('Ethereum Provider not available.');

    // establishes connection to ceramic node
    const ceramic = new Ceramic('http://localhost:7007');
    if (!ceramic) throw new Error('Could not connect to Ceramic node.');
    // sets ceramic client to users DID for authentication
    await ceramic.setDIDProvider(didProvider);

    // Retrieves users IDX
    const idx = new IDX({ ceramic });

    window.idx = idx;
    return idx;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default IDXConnect;
