import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

export interface AuthorizeIDXPayload {
  connect: boolean;
}

export interface IDXBasicProfile {
  name: string;
  image: string;
  description: string;
  background: string;
}

export interface AuthorizeIDXActionPayload {
  connected: boolean;
  basicProfile: IDXBasicProfile | boolean;
  tgthr: object | boolean;
}

export interface IDXState {
  isAuth: boolean;
  basicProfile: IDXBasicProfile | null;
  tgthrProfile: object | null;
  loading: 'idle' | 'pending';
  error: IDXError | null | unknown;
}

export interface IDXError {
  message: string;
  stack: string;
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
