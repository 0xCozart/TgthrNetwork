import type { ImageMetadata, ImageSources } from '@ceramicstudio/idx-constants';
import { IPFS_PREFIX } from '../constants';
import ipfsApi from './ipfsApi';
import { getImageURL } from 'app/utils/misc/imagesUtil';

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

async function ipfsUpload(file: Blob): Promise<string> {
  try {
    const api = await ipfsApi();
    const res = await api.add(file);
    console.log(res.cid.toString());

    return res.cid.toString();
  } catch (error) {
    throw new Error(`Ipfs POST request failed: ${error}`);
  }
}

async function ipfsUploadImage(file: any): Promise<{ cid: string; metadata: { original: ImageMetadata } }> {
  try {
    // let width: number;
    // let height: number;
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      console.log({ width, height });
      return { width, height };
    };
    // let width = img.naturalWidth;
    // let height = img.naturalHeight;
    // console.log({ width, height });

    const cid = await ipfsUpload(file);
    const mimeType = file.type;
    const metadata = {
      original: {
        src: `${IPFS_PREFIX}` + cid,
        mimeType,
        width: 512,
        height: 512
      }
    };
    return { cid, metadata };
  } catch (error) {
    throw new Error(`Ipfs POST request failed: ${error}`);
  }
}

// Returns browser readable ipfs URL from multihash string
async function getIpfsImageSrc(input: string): Promise<string | null> {
  const regex = new RegExp(/ipfs:\/\/([a-zA-Z]+(\d[a-zA-Z]+)+)/, 'i');
  const match = regex.exec(input);
  console.log(match);
  if (match) {
    return await ipfsGetImage(match[1]);
  }
  return null;
}

export { ipfsUpload, ipfsUploadImage, ipfsGet, ipfsGetImage, getIpfsImageSrc };
