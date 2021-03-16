import { combineReducers } from '@reduxjs/toolkit';
import idxReducer from './idx/idxSlice';

const rootReducer = combineReducers({ idx: idxReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
