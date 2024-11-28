import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Define the structure of exchange information
export interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

// Define the structure of the Redux state for the exchange feature
interface ExchangeState {
  currentLevel: number;
  exchangeInfo: ExchangeInfo;
}

// Define the initial state for the exchange slice
const initialState: ExchangeState = {
  currentLevel: 1,
  exchangeInfo: {
    fromAmount: "",
    fromCurrency: "USDT(TRC20)",
    toAmount: "",
    toCurrency: "Perfect Money",
  },
};

// Define an asynchronous thunk to load exchange state from localStorage
export const loadExchangeState = createAsyncThunk(
  "exchange/loadState",
  async () => {
    // Load saved values from localStorage
    const savedLevel = localStorage.getItem("currentLevel");
    const savedExchangeInfo = localStorage.getItem("exchangeInfo");

    // Return the loaded or default values
    return {
      currentLevel: savedLevel ? parseInt(savedLevel, 10) : 1, // Parse saved level or default to 1
      exchangeInfo: savedExchangeInfo
        ? JSON.parse(savedExchangeInfo) // Parse saved exchange info if exists
        : initialState.exchangeInfo, // Default exchange info
    };
  }
);

// Create a slice to manage exchange-related state and actions
const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    // Reducer to update the current level
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload; // Update state
      localStorage.setItem("currentLevel", action.payload.toString());
    },
    // Reducer to update the exchange information
    setExchangeInfo: (state, action: PayloadAction<ExchangeInfo>) => {
      state.exchangeInfo = action.payload; // Update state
      localStorage.setItem("exchangeInfo", JSON.stringify(action.payload));
    },
    // Reducer to reset exchange state to the initial state
    resetExchange: (state) => {
      state.currentLevel = 1;
      state.exchangeInfo = initialState.exchangeInfo;
      localStorage.removeItem("currentLevel");
      localStorage.removeItem("exchangeInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadExchangeState.fulfilled, (state, action) => {
      // When loadExchangeState is successfully fulfilled:
      state.currentLevel = action.payload.currentLevel; // Update state with loaded level
      state.exchangeInfo = action.payload.exchangeInfo; // Update state with loaded exchange info
    });
  },
});

export const { setCurrentLevel, setExchangeInfo, resetExchange } =
  exchangeSlice.actions;

export default exchangeSlice.reducer;
