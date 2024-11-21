import { Button, Typography } from "@mui/material";
import React from "react";

interface TopBarPartsProps {
  levelNumber: number;
  levelName: string;
  onClick: () => void;
  active: boolean;
}

const TopBarParts: React.FC<TopBarPartsProps> = ({
  levelNumber,
  levelName,
  onClick,
  active,
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        sx={{
          boxShadow: active ? "0px 4px 20px 0px #40A57880" : "",
          backgroundColor: active ? "#40A578" : "#596B89",
          color: "white",
          borderRadius: "100%",
          width: "26px",
          height: "26px",
          fontWeight: 400,
          fontSize: "13px",
          lineClamp: "16.9px",
        }}
      >
        {levelNumber}
      </Button>
      <Typography
        variant="TB"
        sx={{
          fontWeight: active ? 700 : 400,
          fontSize: active ? "16px" : "13px",
          lineClamp: active ? "20.8" : "16.9px",
          color: active ? "#40A578" : "inherit", // Directly set color in sx
        }}
        className="cursor-pointer"
      >
        {levelName}
      </Typography>
    </div>
  );
};

export default TopBarParts;
