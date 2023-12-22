import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice';
import { authReducer } from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type RootDispatchType = typeof store.dispatch;
