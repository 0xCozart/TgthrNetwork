import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';
import ethProvider from './ethProvider/ethProvider';

// Returns authorized did from user ethereum portal
export default async function getDidProvider() {
  const threeIdConnect = new ThreeIdConnect();
  const provider = await ethProvider.connect();

  if (!provider) {
    console.log({ provider });
    return null;
  }

  await provider.enable();

  const authProvider = new EthereumAuthProvider(provider, provider.selectedAddress);
  await threeIdConnect.connect(authProvider);

  // console.log({ didProvider, threeIdConnect, provider });
  return await threeIdConnect.getDidProvider();
}
