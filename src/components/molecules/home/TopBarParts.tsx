import React from "react";
import { Button, Typography } from "@mui/material";

interface TopBarPartsProps {
  levelNumber: number;
  levelName: string;
  onClick: () => void;
  active: boolean;
  completed: boolean;
}

const TopBarParts: React.FC<TopBarPartsProps> = ({
  levelNumber,
  levelName,
  onClick,
  active,
  completed,
}) => {
  return (
    <div
      className="flex flex-row items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <Button
        sx={{
          boxShadow: active ? "0px 4px 20px 0px #40A57880" : "",
          flex: "flex-row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active
            ? "#40A578"
            : completed
            ? "#40A578"
            : "#596B89",
          color: "white",
          borderRadius: "100%",
          width: {
            xs: "20px", // small screens (extra small and up)
            md: "26px", // medium screens and up
          },
          height: {
            xs: "20px", // small screens (extra small and up)
            md: "26px", // medium screens and up
          },
          fontWeight: 400,
          fontSize: "13px",
          lineClamp: "16.9px",
        }}
      >
        {levelNumber}
      </Button>
      <Typography
        sx={{
          fontWeight: active ? 700 : 400,
          fontSize: active ? "16px" : "13px",
          lineClamp: active ? "20.8" : "16.9px",
          color: active ? "#40A578" : completed ? "#40A578" : "inherit",
        }}
      >
        {levelName}
      </Typography>
    </div>
  );
};

export default TopBarParts;
