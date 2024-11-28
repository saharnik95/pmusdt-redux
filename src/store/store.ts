import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exchangeReducer from "./exchangeSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exchange: exchangeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
