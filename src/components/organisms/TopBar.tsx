import React from "react";
import TopBarParts from "../molecules/home/TopBarParts";
import { Divider } from "@mui/material";

interface TopBarProps {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}

export default function TopBar({ currentLevel, setCurrentLevel }: TopBarProps) {
  const handleLevelClick = (level: number) => {
    if (level <= currentLevel) {
      setCurrentLevel(level);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-form-background md:rounded-[30px] rounded-[10px] lg:px-[225px] lg:py-12 md:py-8 py-4 lg:gap-10 ">
      {[1, 2, 3].map((level) => (
        <React.Fragment key={level}>
          <TopBarParts
            levelNumber={level}
            levelName={
              level === 1 ? "exchange" : level === 2 ? "confirm" : "complete"
            }
            onClick={() => handleLevelClick(level)}
            active={currentLevel === level}
            completed={currentLevel > level}
          />
          {level < 3 && (
            <Divider
              orientation="horizontal"
              sx={{
                width: {
                  xs: "0px", // small screens (extra small and up)
                  sm: "45px", // small screens and up
                  md: "70px", // medium screens and up
                  lg: "100px", // large screens and up
                },
                backgroundColor: currentLevel > level ? "#40A578" : "#596B89",
                mx: 2,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
