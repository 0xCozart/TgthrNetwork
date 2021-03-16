import { createSlice } from '@reduxjs/toolkit';
import IDXConnect from '../../utils/IDX/IDXConnect';

interface IDXState {
  isAuth: boolean;
  basicProfile: any;
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
          let res = await idx.set('basicProfile', { name: 'alan' });
          console.log({ res });
          // let basicProfile = await idx.get('basicProfile');
          // state = { isAuth: true, basicProfile };
          // console.log({ idx, basicProfile });
        } else {
          state.basicProfile = null;
        }
      })();
    }
  }
});

export const { idxAuth } = idxSlice.actions;

export default idxSlice.reducer;
