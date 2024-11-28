import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmLevel from "@/components/organisms/ConfirmLevel";
import ExchangeLevel from "@/components/organisms/ExchangeLevel";
import CompleteLevel from "@/components/organisms/CompleteLevel";
import TopBar from "@/components/organisms/TopBar";
import { RootState, AppDispatch } from "@/store/store";
import {
  setCurrentLevel,
  setExchangeInfo,
  resetExchange,
  loadExchangeState,
  ExchangeInfo,
} from "@/store/exchangeSlice";
import { restoreUser } from "@/store/authSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLevel, exchangeInfo } = useSelector(
    //reading current level and exchangeinfo from redux
    (state: RootState) => state.exchange
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); //reading authentication from redux

  //dependant on dispatch so it runs only first time and restore and loade data from local storage
  useEffect(() => {
    dispatch(restoreUser());
    dispatch(loadExchangeState());
  }, [dispatch]);

  //if user not authenticated and current level3 it goes back to level2

  useEffect(() => {
    if (!isAuthenticated && currentLevel > 2) {
      dispatch(setCurrentLevel(2));
    }
  }, [isAuthenticated, currentLevel, dispatch]);

  const handleNextLevel = () => {
    const nextLevel = Math.min(currentLevel + 1, isAuthenticated ? 3 : 2);
    dispatch(setCurrentLevel(nextLevel));
  };

  const handleExchangeInfoUpdate = (info: ExchangeInfo) => {
    dispatch(setExchangeInfo(info));
    handleNextLevel();
  };

  const handleReset = () => {
    dispatch(resetExchange());
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
        return <ConfirmLevel onNext={handleNextLevel} />;
      case 3:
        return isAuthenticated ? (
          <CompleteLevel exchangeInfo={exchangeInfo} onReset={handleReset} />
        ) : (
          <ConfirmLevel onNext={handleNextLevel} />
        );
      default:
        return (
          <ExchangeLevel
            onNext={handleExchangeInfoUpdate}
            initialExchangeInfo={exchangeInfo}
          />
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between xl:px-0 xl:mx-auto lg:gap-12 lg:mt-8 lg:mb-[68px] md:gap-8 md:px-8 md:my-16 my-8 px-4 max-w-[1140px]">
      <TopBar
        currentLevel={currentLevel}
        setCurrentLevel={(level: number) => {
          const maxLevel = isAuthenticated ? 3 : 2;
          dispatch(setCurrentLevel(Math.min(level, maxLevel)));
        }}
      />
      {renderLevel()}
    </div>
  );
}
