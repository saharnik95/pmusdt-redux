import { useState, useEffect, useCallback } from "react";
import ConfirmLevel from "@/components/organisms/ConfirmLevel";
import ExchangeLevel from "@/components/organisms/ExchangeLevel";
import CompleteLevel from "@/components/organisms/CompleteLevel";
import TopBar from "@/components/organisms/TopBar";

// Define the structure for exchange information
interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

// Initial exchange information used for resetting or starting fresh
const initialExchangeInfo: ExchangeInfo = {
  fromAmount: "",
  fromCurrency: "USDT(TRC20)",
  toAmount: "",
  toCurrency: "Perfect Money",
};

export default function Home() {
  // State to track the current level in the process
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  // State to store exchange information entered by the user
  const [exchangeInfo, setExchangeInfo] =
    useState<ExchangeInfo>(initialExchangeInfo);

  // State to track whether the saved state has been initialized
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to load saved state from localStorage
  const loadSavedState = useCallback(() => {
    console.log("Loading saved state");

    const savedLevel = localStorage.getItem("currentLevel");
    const savedExchangeInfo = localStorage.getItem("exchangeInfo");

    // Set the current level, defaulting to 1 if not found
    if (savedLevel) {
      const parsedLevel = parseInt(savedLevel, 10);
      // If the saved level was 3, set it to 2 to prevent skipping the confirmation step

      const newLevel = parsedLevel === 3 ? 2 : parsedLevel;
      console.log("Setting user's level to:", newLevel);
      setCurrentLevel(newLevel);
    } else {
      setCurrentLevel(1);
    }

    // Set the exchange info, defaulting to initial state if not found
    if (savedExchangeInfo) {
      console.log("Setting user's exchange info:", savedExchangeInfo);
      setExchangeInfo(JSON.parse(savedExchangeInfo));
    } else {
      setExchangeInfo(initialExchangeInfo);
    }

    // Mark initialization as complete
    setIsInitialized(true);
  }, []);

  // Run the loadSavedState function when the component mounts
  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  // Save the current level and exchange information to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving current level:", currentLevel);
      console.log("Saving exchange info:", exchangeInfo);

      localStorage.setItem("currentLevel", currentLevel.toString());
      localStorage.setItem("exchangeInfo", JSON.stringify(exchangeInfo));
    }
  }, [currentLevel, exchangeInfo, isInitialized]);

  // Handle moving to the next level
  const handleNextLevel = () => {
    setCurrentLevel((prev) => {
      const nextLevel = Math.min(prev + 1, 3);
      console.log("Moving to next level:", nextLevel);
      return nextLevel;
    });
  };

  // Handle updates to exchange information and move to the next level
  const handleExchangeInfoUpdate = (info: ExchangeInfo) => {
    console.log("Updating exchange info:", info);
    setExchangeInfo(info);
    handleNextLevel();
  };

  // Add this function to your Home component
  const handleReset = () => {
    setCurrentLevel(1);
    setExchangeInfo(initialExchangeInfo);
  };

  // Render the appropriate component based on the current level
  const renderLevel = () => {
    console.log("Rendering level:", currentLevel);
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
          <ConfirmLevel onNext={handleNextLevel} exchangeInfo={exchangeInfo} />
        );
      case 3:
        return (
          <CompleteLevel exchangeInfo={exchangeInfo} onReset={handleReset} />
        );
      default:
        return null;
    }
  };

  // Render the main component
  return (
    <div className="w-full flex flex-col items-center justify-between xl:px-0 xl:mx-auto lg:gap-12 lg:mt-8 lg:mb-[68px] md:gap-8 gap-4 md:px-8 md:my-16 my-8 px-4 max-w-[1140px]">
      <TopBar currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      {renderLevel()}
    </div>
  );
}
