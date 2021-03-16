import { IDX } from '@ceramicstudio/idx';
import Ceramic from '@ceramicnetwork/http-client';
import { DIDProvider } from '@ceramicnetwork/common';
import getDidProvider from '../3id-connect/3id-connect';

async function IDXConnect() {
  const didProvider: DIDProvider | undefined = await getDidProvider();
  const ceramic = new Ceramic('http://localhost:7007');
  console.log({ didProvider, ceramic });

  if (!didProvider) throw new Error('Ethereum Provider not available.');
  if (!ceramic) throw new Error('Could not connect to Ceramic node.');

  await ceramic.setDIDProvider(didProvider);

  return new IDX({ ceramic });
}

export default IDXConnect;
