interface EthProvider {
  addresses: string[] | null;
  ethProvider: typeof window.ethereum | null;
}

// Returns authorized did from user ethereum portal
export default async function getEthProvider(): Promise<EthProvider> {
  if (window.ethereum == undefined) {
    console.log('Please install Metamask to connect to the Ethereum Network');
    return { addresses: null, ethProvider: null };
  }

  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => {
    if (error.code === 4001) throw new Error('Please connect to Metamask');
  });
  const ethProvider = window.ethereum;
  return { addresses, ethProvider };
}
