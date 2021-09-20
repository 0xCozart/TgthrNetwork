import { BasicProfile } from '@ceramicstudio/idx-constants';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

export interface AuthorizeIDXPayload {
  connect: boolean;
}

// export interface IDXBasicProfile {
//   name: string;
//   description: string;
//   image: ImageSources;
//   background: ImageSources;
// }

export interface AuthorizeIDXActionPayload {
  connected: boolean;
  // basicProfile: IDXBasicProfile | boolean;
  // tgthr: object | boolean;
}

export interface UpdateIDX {
  definition: 'basicProfile' | 'tgthr';
  data: BasicProfile | any;
}

export interface IDXState {
  isAuth: boolean;
  basicProfile: BasicProfile | null;
  tgthr: any;
  avatarUrl: string | null;
  backgroundUrl: string | null;
  loading: 'idle' | 'pending';
  error: IDXError | null | unknown;
}

export interface IDXError {
  message: string;
  stack: string;
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
