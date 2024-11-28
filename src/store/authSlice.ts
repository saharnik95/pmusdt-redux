import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Define the AuthState interface
interface AuthState {
  user: Omit<User, "password"> | null; //removing password from security purposes
  isAuthenticated: boolean;
  error: string | null;
  forgotPasswordEmail: string | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  forgotPasswordEmail: null,
};

// Mock user data
let users: User[] = [
  {
    id: 1,
    name: "sahar",
    email: "saharnikkhah81@gmail.com",
    password: "123456",
  },
];

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      password,
      keepLoggedIn,
    }: { email: string; password: string; keepLoggedIn: boolean },
    { rejectWithValue } //for returning the error and their value
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() //searching for matched email
      );
      if (!user) throw new Error("EMAIL_NOT_FOUND");
      if (user.password !== password) throw new Error("INVALID_PASSWORD");
      const { password: _, ...userWithoutPassword } = user; //destructuring user to remove password
      return { user: userWithoutPassword, keepLoggedIn };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existingUser) throw new Error("EMAIL_ALREADY_REGISTERED");
      const newUser: User = { id: users.length + 1, name, email, password };
      users.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Async thunk for changing password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { email, newPassword }: { email: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (userIndex === -1) throw new Error("USER_NOT_FOUND");
      users[userIndex].password = newPassword;
      return "Password changed successfully";
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Async thunk for forgot password functionality
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!user) throw new Error("USER_NOT_FOUND");
      return email;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// New async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    {
      id,
      name,
      email,
      password,
    }: { id: number; name?: string; email?: string; password?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userIndex = users.findIndex((u) => u.id === id); //searching for user
      if (userIndex === -1) throw new Error("USER_NOT_FOUND");
      if (name) users[userIndex].name = name; //updating user info
      if (email) users[userIndex].email = email;
      if (password) users[userIndex].password = password;
      const { password: _, ...updatedUser } = users[userIndex];

      // Logout the user after successful update
      dispatch(logout());

      return updatedUser;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    restoreUser: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null; //when still loggin in last error will delete
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: Omit<User, "password">;
            keepLoggedIn: boolean;
          }>
        ) => {
          state.user = action.payload.user; //add user data to state
          state.isAuthenticated = true;
          state.error = null;
          if (action.payload.keepLoggedIn) {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          } else {
            sessionStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordEmail = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.user = null; //deleting previous user data
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("user");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;
