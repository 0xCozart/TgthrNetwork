import WalletConnectProvider from '@walletconnect/web3-provider';
import Authereum from 'authereum';
import Fortmatic from 'fortmatic';
import Web3Modal from 'web3modal';

export default new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'dba6eebb40bd465e807e31bf9866cd71'
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_1D8BB9D11C09B6F8'
      }
    },
    authereum: {
      package: Authereum,
      options: {}
    }
  }
});
