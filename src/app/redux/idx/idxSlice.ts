import { BasicProfile } from '@ceramicstudio/idx-constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIdx } from 'app/utils/IDX/idx/getIdx';
import { getIpfsImageSrc } from 'app/utils/ipfs/ipfsUtils';
import { filterFalsyValuesFromObject } from 'app/utils/misc';
import { AuthorizeIDXPayload, IDXError, IDXState, UpdateIDX } from './idx';

const initialState: IDXState = {
  isAuth: false,
  basicProfile: null,
  tgthr: null,
  avatarUrl: '',
  backgroundUrl: '',
  loading: 'idle',
  error: null
};

const authorizeIDX = createAsyncThunk('idx/authorizeIDX', async (payload: AuthorizeIDXPayload, thunkAPI) => {
  try {
    const idx = await getIdx();
    const basicProfile: BasicProfile | null | undefined = await idx?.get('basicProfile');
    const tgthr = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
    // const keyChain: any = await idx?.get('3ID Keychain');
    // const tgthrProfile: any = null;
    const avatarUrl = basicProfile?.image?.original.src ? await getIpfsImageSrc(basicProfile?.image?.original.src) : '';
    const backgroundUrl = basicProfile?.background?.original.src
      ? await getIpfsImageSrc(basicProfile.background?.original?.src)
      : '';

    return { isAuth: true, basicProfile, tgthr, avatarUrl, backgroundUrl, error: null };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message as IDXError);
  }
});

const updateIdx = createAsyncThunk('idx/updateIdxBasicProfile', async (payload: UpdateIDX, thunkAPI) => {
  {
    try {
      let basicProfile: any;
      let tgthr: any;
      let avatarUrl: any;
      let backgroundUrl: any;
      const idx = await getIdx();
      console.log({ idx });
      const filteredPayload = await filterFalsyValuesFromObject(payload.data);
      const profile = await idx?.merge(payload.definition, { ...filteredPayload });
      if (profile) {
        basicProfile = await idx?.get(payload.definition);
        tgthr = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
        avatarUrl = basicProfile?.image ? await getIpfsImageSrc(basicProfile?.image?.original.src) : '';
        backgroundUrl = basicProfile?.background ? await getIpfsImageSrc(basicProfile.background?.original?.src) : '';
      } else {
        basicProfile = null;
        tgthr = null;
        avatarUrl = '';
        backgroundUrl = '';
      }

      return {
        isAuth: true,
        basicProfile,
        tgthr,
        avatarUrl,
        backgroundUrl,
        error: null
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message as IDXError);
    }
  }
});

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
          state.tgthr = action.payload.tgthr;
          state.avatarUrl = action.payload.avatarUrl;
          state.backgroundUrl = action.payload.backgroundUrl;
          state.error = action.payload.error;
          state.loading = 'idle';
        }
      })
      .addCase(authorizeIDX.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateIdx.pending, (state, action) => {
        {
          if (state.loading === 'idle') {
            state.loading = 'pending';
          }
        }
      })
      .addCase(updateIdx.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = action.payload.isAuth;
          state.basicProfile = action.payload.basicProfile;
          state.tgthr = action.payload.tgthr;
          state.avatarUrl = action.payload.avatarUrl;
          state.backgroundUrl = action.payload.backgroundUrl;
          state.error = action.payload.error;
          state.loading = 'idle';
        }
      })
      .addCase(updateIdx.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export { authorizeIDX, updateIdx };

export default idxSlice.reducer;
