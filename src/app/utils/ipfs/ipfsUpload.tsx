import IPFS from 'ipfs-core';

export default async function ipfsUpload(file): Promise<string> {
  try {
    let ipfsClient;
    if (globalThis.ipfs) {
      ipfsClient = globalThis.ipfs;
    } else {
      ipfsClient = await IPFS.create();
    }

    const { cid } = await ipfsClient.add(file);

    return 'ipfs://' + cid;
  } catch (error) {
    console.log({ error });
    return error.message;
  }
}
