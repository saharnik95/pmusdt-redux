import { useState, useEffect } from "react";
import { Button, Checkbox, Divider, Typography } from "@mui/material";
import ConfirmLevelrules from "../molecules/home/ConfirmLevelrules";
import ConfirmEmail from "../molecules/confirmLevel/ConfirmEmail";

interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

interface ConfirmLevelProps {
  onNext: () => void;
  user: { name: string; email: string } | null;
  exchangeInfo: ExchangeInfo;
}

export default function ConfirmLevel({
  onNext,
  user,
  exchangeInfo,
}: ConfirmLevelProps) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleConfirm = () => {
    if (!agreed) {
      alert("Please agree to the terms.");
      return;
    }

    if (!user && !email) {
      alert("Please enter your email address.");
      return;
    }

    localStorage.setItem("userEmail", email);
    onNext();
  };

  const getCurrencyImage = (currency: string) => {
    switch (currency) {
      case "USDT(TRC20)":
        return "/images/tether.png";
      case "Perfect Money":
        return "/images/perfectMoney.png";
      default:
        return "";
    }
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <div className="w-full flex-col justify-between bg-form-background md:rounded-[30px] rounded-[10px] lg:gap-36 lg:py-12 md:gap-8 gap-4 md:px-20 md:py-6 px-4 py-6 max-w-[1140px] lg:mx-auto">
      <Typography variant="FH" className="text-white">
        Invoice Details :
      </Typography>
      <div className="flex flex-row justify-between items-center lg:mt-[43px] md:mt-[33px] mt-[23px]">
        <Typography variant="FT" className="text-footer-text">
          Send :{" "}
        </Typography>
        <div className="flex items-center">
          <Typography variant="FT" className="text-white">
            {exchangeInfo.fromAmount}
          </Typography>
          <img
            src={getCurrencyImage(exchangeInfo.fromCurrency)}
            alt={exchangeInfo.fromCurrency}
            className="w-6 h-6 m-3 rounded-full"
          />
          <Typography variant="FT" className="text-white">
            {exchangeInfo.fromCurrency}
          </Typography>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center lg:mt-4 mt-2">
        <Typography variant="FT" className="text-footer-text">
          Receive :{" "}
        </Typography>
        <div className="flex items-center">
          <Typography variant="FT" className="text-white">
            {exchangeInfo.toAmount}
          </Typography>
          <img
            src={getCurrencyImage(exchangeInfo.toCurrency)}
            alt={exchangeInfo.toCurrency}
            className="w-6 h-6 m-3 rounded-full"
          />
          <Typography variant="FT" className="text-white">
            {exchangeInfo.toCurrency}
          </Typography>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        sx={{ width: "100%", backgroundColor: "#596B89", mx: 1, mt: "34px" }}
      />
      {!user && (
        <ConfirmEmail onEmailChange={handleEmailChange} initialEmail={email} />
      )}
      <ConfirmLevelrules />
      <div className="flex flex-row mt-8">
        <div className="flex items-center">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            sx={{
              padding: 0,
              color: "#242C39",
              "&.Mui-checked": {
                color: "#1D8D94",
              },
            }}
          />
          <Typography variant="FR" className="text-white">
            I Agree With the <span className="text-[#60A7F8]">AML policy</span>{" "}
            and <span className="text-[#60A7F8]">User Agreement. </span>{" "}
          </Typography>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button
          onClick={handleConfirm}
          sx={{
            marginTop: "42px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
            backgroundColor: "#1D8D94",
          }}
          variant="contained"
          className="w-[560px] align-middle"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
