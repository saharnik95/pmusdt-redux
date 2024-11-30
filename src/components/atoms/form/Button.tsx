import React from "react";
import { Button as MuiButton } from "@mui/material";

export default function Button({
  children,
  disabled,
  height = "80px",
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  height?: string | number;
}) {
  return (
    <MuiButton
      sx={{
        height: height,
        padding: "0 18px",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
        backgroundColor: (theme) => theme.palette.form.buttonBackground,
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
