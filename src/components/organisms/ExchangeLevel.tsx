import React, { useState, useEffect } from "react";
import { Button, CircularProgress, SelectChangeEvent } from "@mui/material";
import ExchangeLevelDiv from "@/components/molecules/exchangeLevel/ExchangeLevelDiv";

interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

interface ExchangeLevelProps {
  onNext: (info: ExchangeInfo) => void;
  initialExchangeInfo: ExchangeInfo;
}

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 4832;

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

  //setting prev data if exists
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

  useEffect(() => {
    const state = {
      fromAmount: fromValue,
      toAmount: toValue,
      fromCurrency,
      toCurrency,
    };
    localStorage.setItem("exchangeState", JSON.stringify(state));
  }, [fromValue, toValue, fromCurrency, toCurrency]);

  //validating for input numbers
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

  //still loading while its not validated
  const handleExchange = () => {
    if (!validateAmount(fromValue)) {
      return;
    }

    setIsLoading(true);

    //calculating to value
    const amount = parseFloat(fromValue);
    const exchangeRate = 1;
    const calculatedToValue = (amount * exchangeRate).toFixed(2);
    setToValue(calculatedToValue);

    const exchangeInfo: ExchangeInfo = {
      fromAmount: fromValue,
      fromCurrency,
      toAmount: calculatedToValue,
      toCurrency,
    };

    setTimeout(() => {
      setIsLoading(false);
      onNext(exchangeInfo);
    }, 5000);
  };

  //swapping
  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromError("");
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    validateAmount(value);
  };

  const handleFromCurrencyChange = (event: SelectChangeEvent<string>) => {
    setFromCurrency(event.target.value as keyof typeof currencyOptions);
  };

  const handleToCurrencyChange = (event: SelectChangeEvent<string>) => {
    setToCurrency(event.target.value as keyof typeof currencyOptions);
  };

  return (
    <div className="relative flex flex-col w-full items-center">
      {/*Top Exchange Div*/}

      <ExchangeLevelDiv
        label="From"
        value={fromValue}
        onChange={handleFromValueChange}
        readOnly={false}
        currency={currencyOptions[fromCurrency as keyof typeof currencyOptions]}
        error={fromError}
        onCurrencyChange={handleFromCurrencyChange}
      />

      {/*Swapping flash */}

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

      {/*Bottom Exchange Div*/}

      <ExchangeLevelDiv
        label="To"
        value={toValue}
        onChange={() => {}}
        readOnly={true}
        currency={currencyOptions[toCurrency as keyof typeof currencyOptions]}
        onCurrencyChange={handleToCurrencyChange}
      />

      {/*Submit Button*/}
      <div className="flex lg:w-[560px] md:w-[480px] justify-center">
        <Button
          sx={{
            marginTop: "27px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
            backgroundColor: "#1D8D94",
          }}
          fullWidth
          variant="contained"
          type="button"
          onClick={handleExchange}
          disabled={!!fromError || isLoading || !fromValue}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Make Exchange"
          )}
        </Button>
      </div>
    </div>
  );
}
