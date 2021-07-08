import create from 'ipfs-http-client';
// const create = require('ipfs-http-client');
declare global {
  interface Window {
    ipfs: any;
  }
}

export default async function ipfsUpload(file: any): Promise<string> {
  try {
    let ipfsClient;

    if (window !== undefined && window.ipfs) {
      ipfsClient = window.ipfs;
    } else {
      ipfsClient = create({ url: 'http://localhost:5002/api/v0' });
      console.log({ ipfsClient });
    }
    const { cid } = await await ipfsClient.add(file);
    console.log({ cid });
    return 'ipfs://' + cid.toString;
  } catch (error) {
    console.log({ error });
    return error.message;
  }
}
