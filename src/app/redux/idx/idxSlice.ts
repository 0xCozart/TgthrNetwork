import { createSlice } from '@reduxjs/toolkit';
import IDXConnect from '../../utils/IDX/IDXConnect/IDXConnect';

interface IDXState {
  isAuth: boolean;
  basicProfile: any;
  tgthrProfile: any;
}

const initialState = { isAuth: false, basicProfile: null } as IDXState;

const idxSlice = createSlice({
  name: 'idx',
  initialState,
  reducers: {
    idxAuth: (state, action) => {
      // sets idx authorized state
      // eslint-disable-next-line
      (async () => {
        if (action.payload.connect) {
          const idx = await IDXConnect();
          if (!idx) {
            throw new Error('User has not authenticated through IDX');
          }
          // let res = await idx.set('basicProfile', { name: 'alan' });
          // console.log({ res });
          const basicProfile = await idx?.get('basicProfile');
          const tgthrProfile = await idx?.get('tgthrProfile');
          if (basicProfile) state = { isAuth: true, basicProfile, tgthrProfile };
          console.log({ idx, basicProfile, tgthrProfile });
        } else {
          state = { isAuth: false, basicProfile: null, tgthrProfile: null };
        }
      })();
    },
    idxSetBasicProfile: (state, action) => {
      // Sets basic profile info and sets it again to idx store
      (async () => {
        const idx = await IDXConnect();
        await idx?.set('basicProfile', { ...state.basicProfile, ...action.payload });
        const basicProfile = await idx?.get('basicProfile');
        state = { isAuth: true, basicProfile, tgthrProfile: state.tgthrProfile };
      })();
    },
    idxSetTgthrPofile: (state, action) => {
      // Sets basic profile info and sets it again to idx store
      (async () => {
        const idx = await IDXConnect();
        await idx?.set('tgthrProfile', { ...state.basicProfile, ...action.payload });
        const basicProfile = await idx?.get('basicProfile');
        const tgthrProfile = await idx?.get('tgthrProfile');
        state = { isAuth: true, basicProfile, tgthrProfile };
      })();
    }
  }
});

export const { idxAuth } = idxSlice.actions;

export default idxSlice.reducer;
