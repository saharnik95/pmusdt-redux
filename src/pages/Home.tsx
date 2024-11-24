import { useState, useEffect, useCallback } from "react";
import ConfirmLevel from "@/components/organisms/ConfirmLevel";
import ExchangeLevel from "@/components/organisms/ExchangeLevel";
import CompleteLevel from "@/components/organisms/CompleteLevel";
import TopBar from "@/components/organisms/TopBar";
import { useAuth } from "@/context/authContext";

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

  // Access user and authentication status from the auth context
  const { isAuthenticated } = useAuth();

  // Function to load saved state (from localStorage) for both authenticated and unauthenticated users
  const loadSavedState = useCallback(() => {
    console.log("Loading saved state");
    console.log("Authentication status:", isAuthenticated);

    if (isAuthenticated) {
      // Load saved data for authenticated users
      const authSavedLevel = localStorage.getItem("auth_currentLevel");
      const authSavedExchangeInfo = localStorage.getItem("auth_exchangeInfo");

      if (authSavedLevel && authSavedExchangeInfo) {
        console.log(
          "Setting authenticated user's saved level:",
          authSavedLevel
        );
        setCurrentLevel(parseInt(authSavedLevel, 10));
        console.log(
          "Setting authenticated user's saved exchange info:",
          authSavedExchangeInfo
        );
        setExchangeInfo(JSON.parse(authSavedExchangeInfo));
      } else {
        // Default state for authenticated users with no saved data
        console.log("No authenticated data found, starting from level 1");
        setCurrentLevel(1);
        setExchangeInfo(initialExchangeInfo);
      }
    } else {
      // Load saved data for unauthenticated users
      const savedLevel = localStorage.getItem("currentLevel");
      const savedExchangeInfo = localStorage.getItem("exchangeInfo");

      if (savedLevel) {
        const parsedLevel = parseInt(savedLevel, 10);
        // Limit unauthenticated users to levels 1 and 2
        const newLevel = Math.min(parsedLevel, 2);
        console.log("Setting non-authenticated user's level to:", newLevel);
        setCurrentLevel(newLevel);
      } else {
        setCurrentLevel(1);
      }

      if (savedExchangeInfo) {
        console.log(
          "Setting non-authenticated user's exchange info:",
          savedExchangeInfo
        );
        setExchangeInfo(JSON.parse(savedExchangeInfo));
      } else {
        setExchangeInfo(initialExchangeInfo);
      }
    }

    // Mark initialization as complete
    setIsInitialized(true);
  }, [isAuthenticated]);

  // Run the loadSavedState function when the component mounts or when auth status changes
  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  // Save the current level and exchange information to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving current level:", currentLevel);
      console.log("Saving exchange info:", exchangeInfo);

      if (isAuthenticated) {
        // Save data for authenticated users
        localStorage.setItem("auth_currentLevel", currentLevel.toString());
        localStorage.setItem("auth_exchangeInfo", JSON.stringify(exchangeInfo));
      } else {
        // Save data for unauthenticated users
        localStorage.setItem("currentLevel", currentLevel.toString());
        localStorage.setItem("exchangeInfo", JSON.stringify(exchangeInfo));
      }
    }
  }, [currentLevel, exchangeInfo, isInitialized, isAuthenticated]);

  // Handle moving to the next level, with restrictions for unauthenticated users
  const handleNextLevel = () => {
    setCurrentLevel((prev) => {
      const nextLevel = Math.min(prev + 1, isAuthenticated ? 3 : 2);
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
        // Only authenticated users can access the final level
        return isAuthenticated ? (
          <CompleteLevel exchangeInfo={exchangeInfo} />
        ) : (
          <div className="text-center p-4 bg-yellow-100 rounded-lg">
            <p className="text-yellow-700">
              Please log in to complete your exchange.
            </p>
            <button
              onClick={() => setCurrentLevel(2)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go back to Confirm Level
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between xl:px-0 xl:mx-auto lg:gap-12 lg:mt-8 lg:mb-[68px] md:gap-8 gap-4 md:px-8 md:my-16 my-8 px-4 max-w-[1140px]">
      <TopBar currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      {renderLevel()}
    </div>
  );
}
