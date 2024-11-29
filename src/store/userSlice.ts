import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentPage: string;
}

const initialState: UserState = {
  currentPage: "Dashboard",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload; //updating current page
    },
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
