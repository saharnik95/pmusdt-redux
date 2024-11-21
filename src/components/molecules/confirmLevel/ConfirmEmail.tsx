import { Input, Typography } from "@mui/material";
import React from "react";

export default function ConfirmEmail() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Typography className="text-footer-text" variant="FI">
        Email:
      </Typography>
      <Input
        sx={{ color: "white" }}
        placeholder="Please enter your email"
        className="w-full text-white px-4 py-5 max-h-[57px] bg-primary-background border-none rounded-md focus:outline-none focus:ring-0 placeholder:text-white placeholder:text-sm placeholder:font-bold placeholder:leading-[18.2]"
      />
    </div>
  );
}
