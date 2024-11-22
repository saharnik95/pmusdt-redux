import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
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

export default function ExchangeLevel({
  onNext,
  initialExchangeInfo,
}: ExchangeLevelProps) {
  const [fromValue, setFromValue] = useState(initialExchangeInfo.fromAmount);
  const [toValue, setToValue] = useState(initialExchangeInfo.toAmount);
  const [isSwapped, setIsSwapped] = useState(false);
  const [fromError, setFromError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("exchangeState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setFromValue(parsedState.fromAmount);
      setToValue(parsedState.toAmount);
      setIsSwapped(parsedState.isSwapped);
    }
  }, []);

  useEffect(() => {
    const state = {
      fromAmount: fromValue,
      toAmount: toValue,
      isSwapped,
    };
    localStorage.setItem("exchangeState", JSON.stringify(state));
  }, [fromValue, toValue, isSwapped]);

  const validateAmount = (amount: number) => {
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

  const handleExchange = () => {
    const amount = parseFloat(fromValue);
    if (!validateAmount(amount)) {
      alert(fromError);
      return;
    }

    setIsLoading(true);

    const exchangeRate = 1; // This should be dynamic in a real application
    const calculatedToValue = (amount * exchangeRate).toFixed(2);
    setToValue(calculatedToValue);

    const exchangeInfo: ExchangeInfo = {
      fromAmount: fromValue,
      fromCurrency: isSwapped ? "Perfect Money" : "USDT(TRC20)",
      toAmount: calculatedToValue,
      toCurrency: isSwapped ? "USDT(TRC20)" : "Perfect Money",
    };

    setTimeout(() => {
      setIsLoading(false);
      onNext(exchangeInfo);
    }, 5000);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    setFromValue(toValue);
    setToValue(fromValue);
    setFromError("");
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    validateAmount(parseFloat(value));
  };

  return (
    <div className="relative flex flex-col w-full items-center">
      <ExchangeLevelDiv
        label="From"
        value={fromValue}
        onChange={handleFromValueChange}
        readOnly={false}
        currency={isSwapped ? "/images/perfectMoney.png" : "/images/tether.png"}
        currencyLabel={isSwapped ? "Perfect Money" : "USDT(TRC20)"}
        error={fromError}
      />

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

      <ExchangeLevelDiv
        label="To"
        value={toValue}
        onChange={() => {}}
        readOnly={true}
        currency={isSwapped ? "/images/tether.png" : "/images/perfectMoney.png"}
        currencyLabel={isSwapped ? "USDT(TRC20)" : "Perfect Money"}
      />
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
          disabled={!!fromError || isLoading}
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
