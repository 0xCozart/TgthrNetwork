import { IDX } from '@ceramicstudio/idx';

export async function idxWindow(): Promise<IDX | null> {
  if (window.idx) {
    // console.log({ idx: window.idx });
    return window.idx;
  } else {
    return null;
  }
}
