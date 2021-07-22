import create from 'ipfs-http-client';
// import CID from 'ipfs-http-client';
// const create = require('ipfs-http-client');
// const { create, CID } = require('ipfs-http-client');
declare global {
  interface Window {
    ipfs: any;
  }
}

async function ipfsGet(cid: string): Promise<any> {
  try {
    let ipfsClient;

    if (window !== undefined && window.ipfs) {
      ipfsClient = window.ipfs;
    } else {
      ipfsClient = create({ url: '/ip4/127.0.0.1/tcp/5001' });
      console.log('IPFS client initiated: ', ipfsClient);
    }
    const file = await ipfsClient.get(cid);
    // if (!file.content) throw new Error('CID did not point to a file!');
    console.log({ file: file.content });
    return file.content;
  } catch (error) {
    console.error(error);
  }
}

async function ipfsUpload(file: any): Promise<string> {
  try {
    let ipfsClient;

    if (window !== undefined && window.ipfs) {
      ipfsClient = window.ipfs;
    } else {
      ipfsClient = create({ url: '/ip4/127.0.0.1/tcp/5001' });
      console.log('IPFS client initiated: ', ipfsClient);
    }
    const { cid } = await await ipfsClient.add(file);
    console.log({ cid });
    return 'ipfs://' + cid.toString;
  } catch (error) {
    console.error({ error });
    return error.message;
  }
}

export { ipfsUpload, ipfsGet };
