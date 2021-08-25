import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IDXConnect from '../../utils/IDX/IDXConnect/IDXConnect';
import { IDXState, AuthorizeIDXPayload, IDXError } from './idx';

const initialState: IDXState = { isAuth: false, basicProfile: null, tgthrProfile: null, loading: 'idle', error: null };

const authorizeIDX = createAsyncThunk('idx/authorizeIDX', async (payload: AuthorizeIDXPayload, thunkAPI) => {
  try {
    if (payload.connect) {
      const idx = await IDXConnect();
      const basicProfile: any = await idx?.get('basicProfile');
      const tgthrProfile: any = (await idx?.has('tghtr')) ? await idx?.get('tgthr') : null;
      const keyChain: any = await idx?.get('3ID Keychain');

      console.log(keyChain);

      return { isAuth: true, basicProfile, tgthrProfile, error: null };
    }
    return;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message as IDXError);
  }
});

const idxSlice = createSlice({
  name: 'idx',
  initialState,
  reducers: {
    // idxAuth: (state, action) => {
    //   // sets idx authorized state
    //   // if (state.isAuth) return;
    //   let idxBasicProfile;
    //   let idxTgthrProfile;
    //   // eslint-disable-next-line
    //   if (action.payload.connect) {
    //     const idx = IDXConnect();
    //     if (
    //       idx.then((res) => {
    //         if (!res) {
    //           return false;
    //         }
    //       })
    //     )
    //       state.isAuth = false;
    //     // let res = await idx.set('basicProfile', { name: 'alan' });
    //     // console.log({ res });
    //     idx.then((idx) => idx?.get('basicProfile'));
    //     idxTgthrProfile = await idx?.get('tgthrProfile');
    //     console.log({ idx, idxBasicProfile, idxTgthrProfile });
    //   } else {
    //     state = { isAuth: false, basicProfile: null, tgthrProfile: null };
    //   }
    //   console.log({ test: 1, idxBasicProfile, idxTgthrProfile });
    //   if (idxBasicProfile) {
    //     state.isAuth = true;
    //     state.basicProfile = idxBasicProfile;
    //     state.tgthrProfile = idxTgthrProfile;
    //   }
    // },
    // idxSetBasicProfile: (state, action) => {
    //   // Sets basic profile info and sets it again to idx store
    //   (async () => {
    //     const idx = await IDXConnect();
    //     await idx?.set('basicProfile', { ...state.basicProfile, ...action.payload });
    //     const basicProfile = await idx?.get('basicProfile');
    //     state = { isAuth: true, basicProfile, tgthrProfile: state.tgthrProfile };
    //   })();
    // },
    // idxSetTgthrPofile: (state, action) => {
    //   // Sets basic profile info and sets it again to idx
    //   (async () => {
    //     const idx = await IDXConnect();
    //     await idx?.set('tgthrProfile', { ...state.basicProfile, ...action.payload });
    //     const tgthrProfile = await idx?.get('tgthrProfile');
    //     state = { isAuth: true, basicProfile: state.basicProfile, tgthrProfile, ... };
    //   })();
    // }
  },
  extraReducers: {
    [authorizeIDX.pending.toString()]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [authorizeIDX.fulfilled.toString()]: (state, action) => {
      // if (!payload) {
      //   state = { isAuth: true, basicProfile: false, tgthr: null, error: null };
      //   return;
      // }

      /* for some reason tgthrProfile isnt present in next store state */

      // state = { ...action.payload };
      state.isAuth = action.payload.isAuth;
      state.basicProfile = action.payload.basicProfile;
      state.tgthrProfile = action.payload.tgthr;
      state.error = action.payload.error;
      // state.error = 'idle';
    },
    //   state.isAuth = false;
    //   state.error = payload;
    // });}
    [authorizeIDX.rejected.toString()]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export { authorizeIDX };

export default idxSlice.reducer;
