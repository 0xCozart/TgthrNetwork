import create from 'ipfs-http-client';

declare global {
  interface Window {
    ipfs: any;
  }
}

async function ipfsApi(): Promise<any> {
  let ipfs = null;
  try {
    // Ipfs will most likely be embedded in the browser, so we need to
    // check if it's available globally.
    if (window !== undefined && window.ipfs) {
      return window.ipfs;
    } else {
      ipfs = create({ url: '/ip4/127.0.0.1/tcp/5011' });
      window.ipfs = ipfs;
      console.log('IPFS client initiated: ', ipfs);
    }
  } catch (e) {
    console.error('IPFS client error: ', e);
  }

  return ipfs;
}

export default ipfsApi;
