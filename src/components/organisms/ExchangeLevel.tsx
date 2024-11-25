import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ExchangeLevelDiv from "@/components/molecules/exchangeLevel/ExchangeLevelDiv";
import { useDebounce } from "@/hook/useDebounce";

// Define the structure for exchange information
interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

// Define the props for the ExchangeLevel component
interface ExchangeLevelProps {
  onNext: (info: ExchangeInfo) => void;
  initialExchangeInfo: ExchangeInfo;
}

// Define constants for minimum and maximum amounts
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 4832;

// Define currency options
const currencyOptions = {
  "USDT(TRC20)": {
    value: "USDT(TRC20)",
    label: "USDT(TRC20)",
    icon: "/images/tether.png",
  },
  "Perfect Money": {
    value: "Perfect Money",
    label: "Perfect Money",
    icon: "/images/perfectMoney.png",
  },
};

export default function ExchangeLevel({
  onNext,
  initialExchangeInfo,
}: ExchangeLevelProps) {
  // State variables for form values and UI states
  const [fromValue, setFromValue] = useState(
    initialExchangeInfo.fromAmount || ""
  );
  const [toValue, setToValue] = useState(initialExchangeInfo.toAmount || "");
  const [fromCurrency, setFromCurrency] = useState(
    initialExchangeInfo.fromCurrency || "USDT(TRC20)"
  );
  const [toCurrency, setToCurrency] = useState(
    initialExchangeInfo.toCurrency || "Perfect Money"
  );
  const [fromError, setFromError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use debounce hook to delay updates to fromValue
  const debouncedFromValue = useDebounce(fromValue, 300);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("exchangeState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setFromValue(parsedState.fromAmount || "");
        setToValue(parsedState.toAmount || "");
        setFromCurrency(parsedState.fromCurrency || "USDT(TRC20)");
        setToCurrency(parsedState.toCurrency || "Perfect Money");
      } catch (error) {
        console.error("Error parsing saved state:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      fromAmount: fromValue,
      toAmount: toValue,
      fromCurrency,
      toCurrency,
    };
    localStorage.setItem("exchangeState", JSON.stringify(state));
  }, [fromValue, toValue, fromCurrency, toCurrency]);

  // Calculate and update toValue whenever debouncedFromValue changes
  useEffect(() => {
    if (validateAmount(debouncedFromValue)) {
      const amount = parseFloat(debouncedFromValue);
      const exchangeRate = 1; // Replace with actual exchange rate logic
      const calculatedToValue = (amount * exchangeRate).toFixed(2);
      setToValue(calculatedToValue);
    }
  }, [debouncedFromValue]);

  // Validate the input amount
  const validateAmount = (value: string) => {
    if (!value || value.trim() === "") {
      setFromError("Please enter an amount");
      return false;
    }
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      setFromError("Please enter a valid number");
      return false;
    }
    if (amount < MIN_AMOUNT) {
      setFromError(`Minimum amount is $${MIN_AMOUNT}`);
      return false;
    }
    if (amount > MAX_AMOUNT) {
      setFromError(`Maximum amount is $${MAX_AMOUNT}`);
      return false;
    }
    setFromError("");
    return true;
  };

  // Handle the exchange button click
  const handleExchange = () => {
    if (!validateAmount(fromValue)) {
      return;
    }

    setIsLoading(true);

    const exchangeInfo: ExchangeInfo = {
      fromAmount: fromValue,
      fromCurrency,
      toAmount: toValue,
      toCurrency,
    };

    setTimeout(() => {
      setIsLoading(false);
      onNext(exchangeInfo);
    }, 1000);
  };

  // Handle swapping currencies and values
  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromError("");
  };

  // Handle changes to the 'from' input value
  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    validateAmount(value);
  };

  // Handle changes to the 'from' currency
  const handleFromCurrencyChange = (event: SelectChangeEvent<string>) => {
    const newFromCurrency = event.target.value as keyof typeof currencyOptions;
    setFromCurrency(newFromCurrency);
    // Automatically change the 'to' currency to the other option
    setToCurrency(
      newFromCurrency === "USDT(TRC20)" ? "Perfect Money" : "USDT(TRC20)"
    );
  };

  // Handle changes to the 'to' currency
  const handleToCurrencyChange = (event: SelectChangeEvent<string>) => {
    const newToCurrency = event.target.value as keyof typeof currencyOptions;
    setToCurrency(newToCurrency);
    // Automatically change the 'from' currency to the other option
    setFromCurrency(
      newToCurrency === "USDT(TRC20)" ? "Perfect Money" : "USDT(TRC20)"
    );
  };

  return (
    <div className="relative flex flex-col w-full items-center">
      {/* From currency input */}
      <ExchangeLevelDiv
        label="From"
        value={fromValue}
        onChange={handleFromValueChange}
        readOnly={false}
        currency={currencyOptions[fromCurrency as keyof typeof currencyOptions]}
        error={fromError}
        onCurrencyChange={handleFromCurrencyChange}
        currencyOptions={currencyOptions}
      />

      {/* Swap button */}
      <div className="relative" style={{ height: "27px" }}>
        <div
          className="absolute top-1/2 left-1/2 w-[69px] h-[69px] rounded-full bg-primary-background flex justify-center items-center z-10 cursor-pointer"
          style={{
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleSwap}
        >
          <img src="/images/flash.png" alt="flash" />
        </div>
      </div>

      {/* To currency input */}
      <ExchangeLevelDiv
        label="To"
        value={toValue}
        onChange={() => {}}
        readOnly={true}
        currency={currencyOptions[toCurrency as keyof typeof currencyOptions]}
        onCurrencyChange={handleToCurrencyChange}
        currencyOptions={currencyOptions}
      />

      {/* Exchange button */}
      <div className="flex lg:w-[560px] md:w-[480px] justify-center">
        <Button
          sx={{
            marginTop: "27px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
            backgroundColor: (theme) => theme.palette.form.buttonBackground,
          }}
          fullWidth
          variant="contained"
          type="button"
          onClick={handleExchange}
          disabled={!!fromError || isLoading || !fromValue}
        >
          <Typography variant="FI" className="text-white">
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Make Exchange"
            )}
          </Typography>
        </Button>
      </div>
    </div>
  );
}
