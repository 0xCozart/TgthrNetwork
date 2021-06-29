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
      ipfsClient = create({ url: '/ip4/127.0.0.1/tcp/5002/http' });
      console.log({ ipfsClient });
    }

    const { cid } = await ipfsClient.add(file);
    console.log({ cid });
    return 'ipfs://' + cid.string;
  } catch (error) {
    console.log({ error });
    return error.message;
  }
}
