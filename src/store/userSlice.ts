import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentPage: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  currentPage: "Dashboard",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setUserProfile: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setCurrentPage, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
