import TopBarParts from "../molecules/home/TopBarParts";
import { Divider } from "@mui/material";
import React, { useState } from "react";

export default function TopBar() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleLevelChange = (level: number) => {
    setCurrentLevel(level);
  };
  return (
    <div className="w-full flex justify-center items-center bg-form-background rounded-[30px] lg:px-[225px] lg:py-12 lg:gap-10">
      <TopBarParts
        levelNumber={1}
        levelName="exchange"
        onClick={() => handleLevelChange(1)}
        active={currentLevel === 1}
      />
      <Divider
        orientation="horizontal"
        sx={{ width: "100px", backgroundColor: "#596B89", mx: 2 }} // Add horizontal margin for spacing
      />
      <TopBarParts
        levelNumber={2}
        levelName="confirm"
        onClick={() => handleLevelChange(2)}
        active={currentLevel === 2}
      />
      <Divider
        orientation="horizontal"
        sx={{ width: "100px", backgroundColor: "#596B89", mx: 2 }} // Add horizontal margin for spacing
      />
      <TopBarParts
        levelNumber={3}
        levelName="complete"
        onClick={() => handleLevelChange(3)}
        active={currentLevel === 3}
      />
    </div>
  );
}
