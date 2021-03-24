import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IDXConnect from '../../utils/IDX/IDXConnect/IDXConnect';
import { IDXState, AuthorizeIDXPayload } from './idx';

const initialState = { isAuth: false, basicProfile: null, tgthr: null, error: null } as IDXState;

const authorizeIDX = createAsyncThunk('idx/authorizeIDX', async (payload: AuthorizeIDXPayload, thunkAPI) => {
  try {
    if (payload.connect) {
      const idx = await IDXConnect();
      const basicProfile = await idx?.get('basicProfile');

      if (!basicProfile) return { basicProfile: false };
      return basicProfile;
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
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
    //   // Sets basic profile info and sets it again to idx store
    //   (async () => {
    //     const idx = await IDXConnect();
    //     await idx?.set('tgthrProfile', { ...state.basicProfile, ...action.payload });
    //     const tgthrProfile = await idx?.get('tgthrProfile');
    //     state = { isAuth: true, basicProfile: state.basicProfile, tgthrProfile };
    //   })();
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(authorizeIDX.fulfilled, (state, action) => {
      if (!action.payload) {
        state = { isAuth: true, basicProfile: false, tgthr: null, error: null };
        return;
      }

      state = { isAuth: true, basicProfile: action.payload, tghr: null, error: null };
    });
  }
});

export const { idxAuth } = idxSlice.actions;

export default idxSlice.reducer;
