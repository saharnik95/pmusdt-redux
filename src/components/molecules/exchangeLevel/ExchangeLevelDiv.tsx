import React from "react";
import { Divider, Input, Typography } from "@mui/material";

interface ExchangeLevelDivProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  currency: string;
  currencyLabel: string;
  error?: string;
}

export default function ExchangeLevelDiv({
  label,
  value,
  onChange,
  readOnly,
  currency,
  currencyLabel,
  error,
}: ExchangeLevelDivProps) {
  return (
    <div className="bg-form-background  md:rounded-[30px] rounded-[10px] lg:w-[560px] md:w-[480px] lg:px-9 lg:py-10 md:px-6 md:py-7 px-4 py-5">
      <Typography variant="FI" className="text-footer-text">
        {label} :
      </Typography>
      <div className="w-full flex justify-center bg-primary-background rounded-[10px] px-4 py-2 gap-2 lg:mt-5 md:mt-4 mt-2">
        <Input
          placeholder="1000"
          disableUnderline
          className="w-full text-white"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          sx={{
            color: "white",
            "&::placeholder": {
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "18.2px",
            },
            "& input::placeholder": {
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "18.2px",
            },
            "& input": {
              border: "none",
              outline: "none",
            },
          }}
        />
        <Divider
          orientation="vertical"
          sx={{
            width: "1px",
            height: "38px",
            backgroundColor: "#596B89",
          }}
        />
        <div className="flex w-full items-center gap-2 ">
          <img
            src={currency}
            className="w-6 h-6 rounded-full"
            alt={currencyLabel}
          />
          <Typography variant="TB" className="text-[#979E9C]">
            {currencyLabel}
          </Typography>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Typography className="text-footer-text" variant="TB">
          Min : $100{" "}
        </Typography>
        <Typography className="text-footer-text" variant="TB">
          {" "}
          Max: $4832{" "}
        </Typography>
      </div>
      {error && (
        <Typography className="text-red-500 mt-2" variant="TB">
          {error}
        </Typography>
      )}
    </div>
  );
}
