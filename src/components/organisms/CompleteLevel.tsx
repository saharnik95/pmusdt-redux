import { useState, useEffect } from "react";
import { Divider, Typography, Button } from "@mui/material";
import CompleteLevelDefault from "../molecules/completeLevel/CompleteLevelDefault";
import CompleteLevelPtoT from "../molecules/completeLevel/CompleteLevelPtoT";
import CompleteLevelSuccess from "../molecules/completeLevel/CompleteLevelSuccess";
import CompleteLevelFailure from "../molecules/completeLevel/CompleteLevelFailure";
import CompleteLevelTimer from "../molecules/completeLevel/CompleteLevelTimer";

interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

interface CompleteLevelProps {
  exchangeInfo: ExchangeInfo;
}

export default function CompleteLevel({ exchangeInfo }: CompleteLevelProps) {
  const [timerStatus, setTimerStatus] = useState<
    "running" | "success" | "failed"
  >("running");
  const [restartTimer, setRestartTimer] = useState(false);

  useEffect(() => {
    setTimerStatus("running");
    setRestartTimer(true);
  }, [exchangeInfo]);

  useEffect(() => {
    if (restartTimer) {
      setRestartTimer(false);
    }
  }, [restartTimer]);

  const handleTimerComplete = (status: "success" | "failed") => {
    console.log(`Timer completed with status: ${status}`);
    setTimerStatus(status);
  };

  const handleRestart = () => {
    setTimerStatus("running");
    setRestartTimer(true);
  };

  const handleMarkSuccess = () => {
    setTimerStatus("success");
  };

  const handleMarkFailed = () => {
    setTimerStatus("failed");
  };

  const getCurrencyImage = (currency: string) => {
    switch (currency) {
      case "USDT(TRC20)":
        return "/images/tether.png";
      case "Perfect Money":
        return "/images/perfectMoney.png";
      default:
        return "";
    }
  };

  return (
    <div className="w-full flex-col justify-between bg-form-background md:rounded-[30px] rounded-[10px] lg:gap-36 lg:py-12 md:gap-8 gap-4 md:px-[79px] md:py-6 px-4 py-6 max-w-[1140px] xl:mx-auto">
      <div className="flex flex-row justify-between items-center">
        <Typography variant="FH" className="text-white">
          Transaction Details :
        </Typography>
        {timerStatus === "running" && (
          <CompleteLevelTimer
            initialTime={1000}
            onComplete={handleTimerComplete}
            restart={restartTimer}
            onRestart={() => setRestartTimer(false)}
          />
        )}
      </div>

      <div className="flex flex-row justify-between items-center lg:mt-[54px]">
        <Typography variant="FT" className="text-footer-text">
          Send :{" "}
        </Typography>
        <div className="flex items-center">
          <Typography variant="FT" className="text-white">
            {exchangeInfo.fromAmount}
          </Typography>
          <img
            src={getCurrencyImage(exchangeInfo.fromCurrency)}
            alt={exchangeInfo.fromCurrency}
            className="w-6 h-6 m-3 rounded-full"
          />
          <Typography variant="FT" className="text-white">
            {exchangeInfo.fromCurrency}
          </Typography>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center lg:mt-4">
        <Typography variant="FT" className="text-footer-text">
          Receive :{" "}
        </Typography>
        <div className="flex items-center">
          <Typography variant="FT" className="text-white">
            {exchangeInfo.toAmount}
          </Typography>
          <img
            src={getCurrencyImage(exchangeInfo.toCurrency)}
            alt={exchangeInfo.toCurrency}
            className="w-6 h-6 mr-2 rounded-full"
          />
          <Typography variant="FT" className="text-white">
            {exchangeInfo.toCurrency}
          </Typography>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        sx={{ width: "100%", backgroundColor: "#596B89", mx: 1, mt: "34px" }}
      />
      {timerStatus === "running" &&
        (exchangeInfo.fromCurrency === "Perfect Money" ? (
          <CompleteLevelPtoT exchangeInfo={exchangeInfo} />
        ) : (
          <CompleteLevelDefault />
        ))}
      {timerStatus === "success" && <CompleteLevelSuccess />}
      {timerStatus === "failed" && (
        <CompleteLevelFailure onRestart={handleRestart} />
      )}
      {timerStatus === "running" && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handleMarkSuccess}
            variant="contained"
            color="primary"
            className="bg-green-500 hover:bg-green-600"
          >
            Mark as Successful
          </Button>
          <Button
            onClick={handleMarkFailed}
            variant="contained"
            color="secondary"
            className="bg-red-500 hover:bg-red-600"
          >
            Mark as Failed
          </Button>
        </div>
      )}
    </div>
  );
}
