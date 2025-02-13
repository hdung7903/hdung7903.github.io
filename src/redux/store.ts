import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import authReducer from "./slices/authSlice";
import chatbotReducer from "./slices/chatbotSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
