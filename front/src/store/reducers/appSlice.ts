import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSession } from './authSlice';
import { IUser, IUserRequest } from 'services/services.interface';
import { userService } from 'services/services';

export interface INotice {
  message: string;
  type: 'error' | 'success';
}

interface IAppInitialState {
  isAppInitialized: boolean;
  loading: boolean;
  userInfo: IUser | null;
}

const initialState: IAppInitialState = {
  isAppInitialized: false,
  loading: false,
  userInfo: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initialize.fulfilled, state => {
        state.isAppInitialized = true;
      })
      .addCase(initialize.rejected, state => {
        state.isAppInitialized = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      })
      .addCase(setInfo.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      });
  },
});

export const appReducer = appSlice.reducer;
export const { setLoading } = appSlice.actions;

export const initialize = createAsyncThunk<void, void, any>(
  'app/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      await dispatch(getSession());
    } catch (error) {
      return rejectWithValue('[initialize]: Error');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getUser = createAsyncThunk<IUser, void, any>(
  'app/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getInfo();
    } catch (error) {
      return rejectWithValue('[getUser]: Error');
    }
  },
);

export const setInfo = createAsyncThunk<IUser, IUserRequest, any>(
  'app/setInfo',
  async (data, { rejectWithValue }) => {
    try {
      return await userService.setInfo(data);
    } catch (error) {
      return rejectWithValue('[setInfo]: Error');
    }
  },
);
