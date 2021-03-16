import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';
import ethProvider from '../ethProvider/ethProvider';

// Returns authorized did from user ethereum portal
export default async function getDidProvider() {
  const threeIdConnect = new ThreeIdConnect();
  const provider = await ethProvider.connect();
  // await provider.on("connect", () => {

  // })
  // console.log({ provider, threeIdConnect });

  if (!provider) {
    console.log({ provider });
    return;
  }
  await provider.enable();

  const authProvider = new EthereumAuthProvider(
    provider,
    provider.selectedAddress
  );
  await threeIdConnect.connect(authProvider);

  const didProvider = await threeIdConnect.getDidProvider();
  // console.log({ didProvider, threeIdConnect, provider });

  return didProvider;
}
