import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';
import ethProvider from './ethProvider/ethProvider';

const threeIdConnect = new ThreeIdConnect();

// Returns authorized did from user ethereum portal
export default async function getDidProvider() {
  const provider = await ethProvider.connect();
  // await provider.on("connect", () => {

  // })
  console.log({ provider, threeIdConnect });

  if (!provider) {
    console.log({ provider });
    return;
  }

  await provider.enable();

  const authProvider = new EthereumAuthProvider(provider, provider.selectedAddress);
  await threeIdConnect.connect(authProvider);

  // console.log({ didProvider, threeIdConnect, provider });

  return threeIdConnect.getDidProvider();
}
