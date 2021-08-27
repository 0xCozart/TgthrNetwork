import { CeramicIDX } from './idx';

export async function ceramicIdxWindow(): Promise<CeramicIDX> {
  if (window.idx && window.ceramic) {
    // console.log({ idx: window.idx });
    return { ceramic: window.ceramic, idx: window.idx };
  } else {
    return { ceramic: null, idx: null };
  }
}
