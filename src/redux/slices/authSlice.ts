import axios from "axios";

import { AuthState } from "../../types/data.interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem("user") ?? "null"),
  token: localStorage.getItem("authenticationToken") ?? "",
  isLoading: false,
  error: null,
};
const storeUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("user", JSON.stringify(user));
};

const storeAuthenticationToken = (jwt: string, rememberMe: boolean) => {
  // const storage = rememberMe ? localStorage : sessionStorage;
  localStorage.setItem("authenticationToken", jwt);
  sessionStorage.setItem("authenticationToken", jwt);
};

const clearUser = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};

const clearAuthenticationToken = () => {
  localStorage.removeItem("authenticationToken");
  sessionStorage.removeItem("authenticationToken");
  localStorage.removeItem("authenticationToken");
  sessionStorage.removeItem("authenticationToken");
};

const getToken = () => {
  return (
    localStorage.getItem("authenticationToken") ??
    sessionStorage.getItem("authenticationToken")
  );
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string; rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/auth/token`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.result?.token;
      const user = response.data.result?.user;

      storeUser(user);

      if (token) {
        storeAuthenticationToken(token, credentials.rememberMe);
        return { token, user };
      }
      return rejectWithValue("Invalid token received");
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "An error occurred during login"
      );
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = "email profile";
    const responseType = "code";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = googleAuthUrl;
    return;
  }
);

export const handleGoogleCallback = createAsyncThunk(
  "auth/handleGoogleCallback",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/auth/outbound/authentication`,
        null,
        { params: { code } }
      );

      const jwt = response.data.result?.token;
      if (jwt) {
        storeAuthenticationToken(jwt, true);

        return { token: jwt, user: response.data.result.user };
      }
      return rejectWithValue(
        "Invalid token received from Google authentication"
      );
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "An error occurred during Google login"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/auth/logout`,
        { token: getToken() },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      clearAuthenticationToken();
      clearUser();
      return;
    } catch (error: any) {
      clearAuthenticationToken();
      clearUser();
      return rejectWithValue(
        error?.response?.data?.message || "An error occurred during logout"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
