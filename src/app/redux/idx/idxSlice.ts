import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BasicProfile } from '@ceramicstudio/idx-constants';
import { getIdx } from '../../utils/IDX/idx/getIdx';
import { IDXState, AuthorizeIDXPayload, IDXError, IDXUpdateBasicProfilePayload } from './idx';

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
    const basicProfile: BasicProfile | null | undefined = await idx?.get('basicProfile');
    const tgthrProfile = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
    // const keyChain: any = await idx?.get('3ID Keychain');
    // const tgthrProfile: any = null;

    console.log({ idx, basicProfile });

    return { isAuth: true, basicProfile, tgthrProfile, error: null };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message as IDXError);
  }
});

const updateIdxBasicProfile = createAsyncThunk(
  'idx/updateIdxBasicProfile',
  async (payload: IDXUpdateBasicProfilePayload, thunkAPI) => {
    {
      try {
        let basicProfile: any;
        let tgthr: any;
        const idx = await getIdx();
        console.log({ idx });
        const profile = await idx?.merge(payload.definition, { ...payload.profile });
        if (profile) {
          basicProfile = await idx?.get('basicProfile');
          tgthr = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
        }
        return { isAuth: true, basicProfile: basicProfile, tgthrProfile: tgthr, error: null };
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message as IDXError);
      }
    }
  }
);

const idxSlice = createSlice({
  name: 'idx',
  initialState,
  reducers: {},
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
          state.basicProfile = action.payload.basicProfile ? action.payload.basicProfile : null;
          state.tgthrProfile = action.payload.tgthrProfile;
          state.error = action.payload.error;
        }
      })
      .addCase(authorizeIDX.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateIdxBasicProfile.pending, (state, action) => {
        {
          if (state.loading === 'idle') {
            state.loading = 'pending';
          }
        }
      })
      .addCase(updateIdxBasicProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = action.payload.isAuth;
          state.basicProfile = action.payload.basicProfile;
          state.tgthrProfile = action.payload.tgthrProfile;
          state.error = action.payload.error;
        }
      })
      .addCase(updateIdxBasicProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export { authorizeIDX, updateIdxBasicProfile };

export default idxSlice.reducer;
