import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from 'services/services';
import {
  ILoginRequest,
  IRegistrationRequest,
  ISessionResponse,
} from 'services/services.interface';

interface IAuthInitialState {
  user: ISessionResponse | null;
}

const initialState: IAuthInitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSession.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;

export const getSession = createAsyncThunk<ISessionResponse, void, any>(
  'auth/getSession',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getSession();
    } catch (error) {
      return rejectWithValue('[getSession]: Error');
    }
  },
);

export const login = createAsyncThunk<void, ILoginRequest, any>(
  'auth/login',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await authService.login(params);
      await dispatch(getSession());
    } catch (e) {
      return rejectWithValue('[login]: Error');
    }
  },
);

export const registration = createAsyncThunk<void, IRegistrationRequest, any>(
  'auth/registration',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await authService.registration(params);
      await dispatch(getSession());
    } catch (e) {
      return rejectWithValue('[registration]: Error');
    }
  },
);

export const logout = createAsyncThunk<void, void, any>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch {
      return rejectWithValue('[registration]: Error');
    }
  },
);
