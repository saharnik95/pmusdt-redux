import { useState, useEffect } from "react";
import ConfirmLevel from "@/components/organisms/ConfirmLevel";
import ExchangeLevel from "@/components/organisms/ExchangeLevel";
import CompleteLevel from "@/components/organisms/CompleteLevel";
import TopBar from "@/components/organisms/TopBar";
import { useAuth } from "@/services/authContext";

interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo>({
    fromAmount: "",
    fromCurrency: "USDT(TRC20)",
    toAmount: "",
    toCurrency: "Perfect Money",
  });

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const savedLevel = localStorage.getItem("currentLevel");
      if (savedLevel) {
        setCurrentLevel(parseInt(savedLevel, 10));
      }

      const savedExchangeInfo = localStorage.getItem("exchangeInfo");
      if (savedExchangeInfo) {
        setExchangeInfo(JSON.parse(savedExchangeInfo));
      }
    } else {
      // Reset to initial state when not authenticated
      setCurrentLevel(1);
      setExchangeInfo({
        fromAmount: "",
        fromCurrency: "USDT(TRC20)",
        toAmount: "",
        toCurrency: "Perfect Money",
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("currentLevel", currentLevel.toString());
      localStorage.setItem("exchangeInfo", JSON.stringify(exchangeInfo));
    }
  }, [currentLevel, exchangeInfo, isAuthenticated]);

  const handleNextLevel = () => {
    setCurrentLevel((prev) => Math.min(prev + 1, 3));
  };

  const handleExchangeInfoUpdate = (info: ExchangeInfo) => {
    setExchangeInfo(info);
    handleNextLevel();
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return (
          <ExchangeLevel
            onNext={handleExchangeInfoUpdate}
            initialExchangeInfo={exchangeInfo}
          />
        );
      case 2:
        return (
          <ConfirmLevel
            onNext={handleNextLevel}
            user={user}
            exchangeInfo={exchangeInfo}
          />
        );
      case 3:
        return <CompleteLevel exchangeInfo={exchangeInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between xl:px-0 xl:mx-auto lg:gap-12 lg:py-12 md:gap-8 gap-4 md:px-8 md:py-6 px-4 py-6 max-w-[1140px]">
      <TopBar currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      {renderLevel()}
    </div>
  );
}
