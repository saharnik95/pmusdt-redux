import React, { useState } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import DownFlashIconComponent from "@/components/icons/DownFlashIconComponent";
import CompleteLevelPtoTwaiting from "./CompleteLevelPtoTwaiting";

interface CompleteLevelPtoTProps {
  exchangeInfo: {
    fromAmount: string;
    fromCurrency: string;
    toAmount: string;
    toCurrency: string;
  };
}

export default function CompleteLevelPtoT({
  exchangeInfo,
}: CompleteLevelPtoTProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("Tron");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const networks = ["Tron", "Ethereum", "Binance Smart Chain"];

  const [values, setValues] = useState({
    perfectMoneyCode: "",
    perfectMoneyNumber: "",
    address: "",
  });

  const InputList = [
    {
      id: 1,
      label: "Perfect Money Code :",
      placeholder: "Please Enter Perfect Money Code ",
      name: "perfectMoneyCode",
    },
    {
      id: 2,
      label: "Perfect Money Number :",
      placeholder: "Please Enter Perfect Money Number ",
      name: "perfectMoneyNumber",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNetworkChange = (event: SelectChangeEvent<string>) => {
    setSelectedNetwork(event.target.value as string);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      values.perfectMoneyCode &&
      values.perfectMoneyNumber &&
      values.address
    ) {
      setIsSubmitted(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  if (isSubmitted) {
    return (
      <CompleteLevelPtoTwaiting
        address={values.address}
        amount={exchangeInfo.toAmount}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      {InputList.map(({ id, label, placeholder, name }) => (
        <div key={id} className="flex flex-col mb-3">
          <label htmlFor={name} className="block font-medium text-form-text ">
            <Typography variant="FI">{label}</Typography>
          </label>
          <input
            id={name}
            name={name}
            type="text"
            value={values[name as keyof typeof values]}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-full text-white mt-3 px-4 py-5 max-h-[57px] bg-primary-background border-none rounded-md focus:outline-none  focus:ring-primary focus:ring-0 placeholder:text-white placeholder:text-sm placeholder:font-bold placeholder:leading-[18.2]`}
            required
          />
        </div>
      ))}

      {/* Network Selection */}
      <div className="mb-[15px]">
        <label
          htmlFor="network"
          className="block font-medium text-form-text mb-[5px]"
        >
          <Typography variant="FI">
            Choose Network And Enter Tether Address :
          </Typography>
        </label>

        <div className="flex flex-row items-center">
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
                paddingRight: "40px",
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
                {network}
              </MenuItem>
            ))}
          </Select>

          <input
            id="address"
            name="address"
            type="text"
            value={values.address}
            onChange={handleInputChange}
            placeholder="Please enter address"
            className="w-full text-white px-4 py-5 h-[57px] bg-primary-background border-none focus:outline-none focus:ring-primary focus:ring-0 placeholder:text-white placeholder:text-sm placeholder:font-bold placeholder:leading-[18.2]"
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        sx={{
          alignSelf: "center",
          width: {
            xs: "310px",
            md: "500px",
            lg: "560px",
          },
          padding: "18px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
          backgroundColor: "#1D8D94",
        }}
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
