import create from 'ipfs-http-client';

declare global {
  interface Window {
    ipfs: any;
  }
}

export default async function ipfsUpload(file: any): Promise<string> {
  try {
    let ipfsClient;
    if (window.ipfs) {
      ipfsClient = window.ipfs;
    } else {
      ipfsClient = create({ url: 'http://127.0.0.1:45005/' });
    }

    const { cid } = await ipfsClient.add(file);
    console.log({ cid });
    return 'ipfs://' + cid;
  } catch (error) {
    console.log({ error });
    return error.message;
  }
}
