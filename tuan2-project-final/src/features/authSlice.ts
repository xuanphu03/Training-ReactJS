import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  loading: boolean;
  userInfo: null | { username: string | null };
  userToken: string | null;
  error: string | null;
};

const initialState: AuthState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
};

export const loginUser = createAsyncThunk<
  { userInfo: { username: string }; userToken: string },
  LoginCredentials,
  { rejectValue: string }
>('/api/login', async (credentials: LoginCredentials, thunkAPI) => {
  return new Promise<{ userInfo: { username: string }; userToken: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === 'chuyennhagao@gmail.com' &&
          credentials.password === 'Abcd12345@'
        ) {
          resolve({
            userInfo: { username: 'admin' },
            userToken: 'fake-jwt-token',
          });
        } else {
          reject(thunkAPI.rejectWithValue('Invalid email or password'));
        }
      }, 2000);
    }
  ).catch((err) => {
    return thunkAPI.rejectWithValue(err.message || 'Invalid email or password');
  });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;

      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.userToken = action.payload.userToken;

        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload.userInfo)
        );
        localStorage.setItem('userToken', action.payload.userToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
