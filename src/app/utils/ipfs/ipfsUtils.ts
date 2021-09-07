import ipfsApi from './ipfs';
import { getImageURL } from '../misc/imagesUtil';

declare global {
  interface Window {
    ipfs: any;
  }
}

async function ipfsGetImage(cid: string) {
  if (cid == '' || cid == null || cid == undefined) {
    return null;
  }

  const api = await ipfsApi();

  for await (const file of api.get(cid)) {
    const content = [];
    if (file.content) {
      for await (const chunk of file.content) {
        content.push(chunk);
      }
      return getImageURL(content);
    }
  }
  return null;
}

async function ipfsGet(cid: string): Promise<any> {
  try {
    const api = await ipfsApi();
    const files = await api.get(cid);

    for await (const file of files) {
      console.log(file.type, file.path);
      if (!file.content) continue;

      const content = [];
      for await (const chunk of file.content) {
        content.push(chunk);
      }
      console.log(content.toString());
      return content;
    }

    // if (!file.content) throw new Error('CID did not point to a file!');
  } catch (error) {
    throw new Error(`Ipfs GET request failed:  ${error}`);
  }
}

async function ipfsUpload(file: any): Promise<string> {
  try {
    const api = await ipfsApi();
    const res = await await api.pin(file);
    console.log(res.cid.toString());

    return 'https://ipfs.io/ipfs/' + res.cid.toString();
  } catch (error) {
    throw new Error(`Ipfs POST request failed: ${error}`);
  }
}

export { ipfsUpload, ipfsGet, ipfsGetImage };
