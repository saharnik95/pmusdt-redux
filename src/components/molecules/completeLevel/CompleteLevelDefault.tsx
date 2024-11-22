import { useState } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import DownFlashIconComponent from "@/components/icons/DownFlashIconComponent";

export default function CompleteLevelDefault() {
  const [selectedNetwork, setSelectedNetwork] = useState("Tron");

  const networks = ["Tron", "Ethereum", "Binance Smart Chain"];

  const exchangeProcessSteps = [
    {
      id: 1,
      text: "Any change in exchange rate on the Binance exchange gives us the right to recalculate the amount of the application.",
    },
    {
      id: 2,
      text: "The rate for your application will be fixed after 1 confirmation online.",
    },
    { id: 3, text: "Funds are credited after 20 transaction confirmations." },
  ];

  const handleNetworkChange = (event: SelectChangeEvent<string>) => {
    setSelectedNetwork(event.target.value as string);
  };

  return (
    <div className="flex flex-col mt-6 lg:mt-[56px]">
      {/* Top part */}
      <div className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-12 gap-6">
        <div className="flex flex-col justify-between w-full lg:w-auto">
          <Typography variant="SB" className="text-footer-text text-wrap mb-4">
            Choose Network And To Receive 120 Perfect Money, Please Deposit 100
            Tether to the Tether Address Below:
          </Typography>

          <div className="w-full flex flex-col sm:flex-row">
            <Select
              value={selectedNetwork}
              onChange={handleNetworkChange}
              className="sm:w-[126px] w-full bg-[#1D8D94] text-white rounded-t-[10px] sm:rounded-t-none sm:rounded-l-[10px]"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20.8px",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                "& .MuiSelect-select": {
                  padding: "16px",
                  paddingRight: "40px", // Add space for the icon
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiSvgIcon-root": {
                  display: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-icon": {
                  right: "12px",
                  color: "white",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#1D8D94",
                    "& .MuiMenuItem-root": {
                      color: "white",
                    },
                  },
                },
              }}
              IconComponent={DownFlashIconComponent}
            >
              {networks.map((network) => (
                <MenuItem key={network} value={network}>
                  <Typography
                    variant="FI"
                    className="text-white text-xs sm:text-sm"
                  >
                    {network}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            <span className="bg-primary-background w-full p-2 sm:p-4 rounded-b-[10px] sm:rounded-b-none sm:rounded-r-[10px] break-all">
              <Typography
                variant="FI"
                className="text-white text-xs sm:text-sm"
              >
                x09aa998ee454c456255daf3ac94908f1dcfb7033
              </Typography>
            </span>
          </div>
        </div>

        <div className="mt-4 lg:mt-0 flex-shrink-0">
          <img
            src="/images/qr.png"
            alt="qr"
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[191px] lg:h-[191px]"
          />
        </div>
      </div>

      {/* Exchange Conditions */}
      <div className="flex flex-col mt-8 lg:mt-10">
        <Typography variant="FT" className="text-white pb-4">
          Exchange Conditions:
        </Typography>

        {exchangeProcessSteps.map((step) => (
          <div key={step.id} className="flex items-start gap-3 mt-3">
            <Button
              sx={{
                backgroundColor: "#1D8D94",
                color: "white",
                borderRadius: "50%",
                minWidth: "26px",
                minHeight: "26px",
                width: "26px",
                height: "26px",
                padding: 0,
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {step.id}
            </Button>
            <Typography
              variant="FR"
              className="text-white"
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                  md: "16px",
                },
                lineHeight: 1.5,
              }}
            >
              {step.text}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
