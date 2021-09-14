import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BasicProfile } from '@ceramicstudio/idx-constants';
import { getIdx } from 'app/utils/IDX/idx/getIdx';
import { IDXState, AuthorizeIDXPayload, IDXError, UpdateIDX } from './idx';
import { filterFalsyValuesFromObject } from 'app/utils/misc';
import { getIpfsImageSrc } from 'app/utils/ipfs/ipfsUtils';

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
    const avatarUrl = basicProfile?.image ? await getIpfsImageSrc(basicProfile?.image?.original.src) : '';
    const backgroundUrl = basicProfile?.background ? await getIpfsImageSrc(basicProfile.background?.original?.src) : '';

    console.log({ idx, basicProfile });

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
      const idx = await getIdx();
      console.log({ idx });
      const filteredPayload = await filterFalsyValuesFromObject(payload.data);
      const profile = await idx?.set(payload.definition, { ...filteredPayload });
      if (profile) {
        basicProfile = await idx?.get(payload.definition);
        tgthr = (await idx?.has('tghtr')) === true ? await idx?.get('tgthr') : null;
      } else {
        basicProfile = null;
        tgthr = null;
      }
      const avatarUrl = basicProfile?.image ? await getIpfsImageSrc(basicProfile?.image?.original.src) : '';
      const backgroundUrl = basicProfile?.background
        ? await getIpfsImageSrc(basicProfile.background?.original?.src)
        : '';
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
