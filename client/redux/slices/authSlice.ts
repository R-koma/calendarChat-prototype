import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${serverUrl}/login`, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      let errorMessage = "Login failed";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${serverUrl}/register`, credentials);
      return response.data;
    } catch (err) {
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
