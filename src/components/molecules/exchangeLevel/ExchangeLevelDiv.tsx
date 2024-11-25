import React from "react";
import {
  Divider,
  Input,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface CurrencyOption {
  value: string;
  label: string;
  icon: string;
}

interface ExchangeLevelDivProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  currency: CurrencyOption;
  error?: string;
  onCurrencyChange: (event: SelectChangeEvent<string>) => void;
  currencyOptions: Record<string, CurrencyOption>;
}

export default function ExchangeLevelDiv({
  label,
  value,
  onChange,
  readOnly,
  currency,
  error,
  onCurrencyChange,
  currencyOptions,
}: ExchangeLevelDivProps) {
  return (
    <div className="bg-form-background md:rounded-[30px] rounded-[10px] lg:w-[560px] md:w-[480px] lg:px-9 lg:py-10 md:px-6 md:py-7 px-4 py-5">
      {/* Label for the input */}
      <Typography variant="body1" className="text-footer-text">
        {label} :
      </Typography>
      <div className="w-full flex justify-center bg-primary-background rounded-[10px] px-4 py-2 gap-2 lg:mt-5 md:mt-4 mt-2">
        {/* Input field for amount */}
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
        {/* Vertical divider */}
        <Divider
          orientation="vertical"
          sx={{
            width: "1px",
            height: "38px",
            backgroundColor: "#596B89",
          }}
        />
        {/* Currency select dropdown */}
        <Select
          value={currency.value}
          onChange={onCurrencyChange}
          displayEmpty
          variant="standard"
          disableUnderline
          sx={{
            color: "#979E9C",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingRight: "32px",
            },
            width: "100%",
            "& .MuiSelect-icon": {
              display: "none",
            },
          }}
        >
          {/* Render menu items for each currency option */}
          {Object.values(currencyOptions).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div className="flex w-full items-center gap-2">
                <img
                  src={option.icon}
                  className="w-6 h-6 rounded-full"
                  alt={option.label}
                />
                <Typography variant="body2" className="text-[#979E9C]">
                  {option.label}
                </Typography>
              </div>
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* Display min and max amounts */}
      <div className="flex gap-4 mt-4">
        <Typography className="text-footer-text" variant="body2">
          Min : $100{" "}
        </Typography>
        <Typography className="text-footer-text" variant="body2">
          {" "}
          Max: $4832{" "}
        </Typography>
      </div>
      {/* Display error message if any */}
      {error && (
        <Typography className="text-red-500 mt-2" variant="body2">
          {error}
        </Typography>
      )}
    </div>
  );
}
