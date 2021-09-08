import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIdx } from '../../utils/IDX/idx/getIdx';
import { IDXState, AuthorizeIDXPayload, IDXError, IDXUpdateProfilePayload } from './idx';

const initialState: IDXState = {
  isAuth: false,
  basicProfile: null,
  tgthrProfile: null,
  loading: 'idle',
  error: null
};

const authorizeIDX = createAsyncThunk('idx/authorizeIDX', async (payload: AuthorizeIDXPayload, thunkAPI) => {
  try {
    const idx = await getIdx();
    const basicProfile: any = await idx!.get('basicProfile');
    const tgthrProfile: any = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
    // const keyChain: any = await idx?.get('3ID Keychain');
    // const tgthrProfile: any = null;

    console.log({ idx, basicProfile });

    return { isAuth: true, basicProfile, tgthrProfile, error: null };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message as IDXError);
  }
});

const updateIdxDefintion = createAsyncThunk(
  'idx/updateIdxBasicProfile',
  async (payload: IDXUpdateProfilePayload, thunkAPI) => {
    {
      try {
        let basicProfile: any;
        let tgthr: any;
        const idx = await getIdx();
        const profile = await idx!.merge(payload.definition, payload.profile);
        if (profile) {
          basicProfile = await idx!.get('basicProfile');
          tgthr = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
        }
        return { isAuth: true, basicProfile: basicProfile, tgthrProfile: tgthr, error: null };
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message as IDXError);
      }
    }
  }
);

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
  extraReducers: (builder) => {
    builder

      .addCase(authorizeIDX.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(authorizeIDX.fulfilled, (state, action) => {
        /* for some reason tgthrProfile isnt present in next store state */
        if (action.payload) {
          state.isAuth = action.payload.isAuth;
          state.basicProfile = action.payload.basicProfile;
          state.tgthrProfile = action.payload.tgthrProfile;
          state.error = action.payload.error;
        }
      })
      .addCase(authorizeIDX.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateIdxDefintion.pending, (state, action) => {
        {
          if (state.loading === 'idle') {
            state.loading = 'pending';
          }
        }
      })
      .addCase(updateIdxDefintion.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = action.payload.isAuth;
          state.basicProfile = action.payload.basicProfile;
          state.tgthrProfile = action.payload.tgthrProfile;
          state.error = action.payload.error;
        }
      })
      .addCase(updateIdxDefintion.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export { authorizeIDX, updateIdxDefintion };

export default idxSlice.reducer;
