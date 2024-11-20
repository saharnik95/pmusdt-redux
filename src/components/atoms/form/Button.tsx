import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}
export default function Button({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <MuiButton
      sx={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
        backgroundColor: "#1D8D94",
      }}
      variant="contained"
      fullWidth
      disabled={disabled}
      type="submit"
    >
      {children}
    </MuiButton>
  );
}
