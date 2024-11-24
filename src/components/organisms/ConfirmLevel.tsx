import { useState, useEffect } from "react";
import { Button, Checkbox, Divider, Typography } from "@mui/material";
import ConfirmLevelrules from "../molecules/confirmLevel/ConfirmLevelrules";
import ConfirmEmail from "../molecules/confirmLevel/ConfirmEmail";
import { Check } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";

interface ExchangeInfo {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
}

interface ConfirmLevelProps {
  onNext: () => void;
  exchangeInfo: ExchangeInfo;
}

export default function ConfirmLevel({
  onNext,
  exchangeInfo,
}: ConfirmLevelProps) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleConfirm = async () => {
    if (!agreed) {
      setError("Please agree to the terms.");
      return;
    }

    if (!isAuthenticated) {
      try {
        const user = await authService.login(email, password);
        await login(user.name, user.email, password, true);
        localStorage.setItem("userEmail", user.email);
        onNext();
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "EMAIL_NOT_FOUND") {
            setError("Email doesn't exist. Please register.");
            setTimeout(() => navigate("/register"), 3000);
          } else if (error.message === "INVALID_PASSWORD") {
            setError("Incorrect password. Please try again.");
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        }
      }
    } else {
      onNext();
    }
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

      {!isAuthenticated && (
        <ConfirmEmail
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          initialEmail={email}
        />
      )}

      <ConfirmLevelrules />

      <div className="flex flex-row mt-8">
        <div className="flex items-center">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            icon={<span className="w-8 h-8 rounded-lg bg-[#242C39]" />}
            checkedIcon={
              <span className="w-8 h-8 rounded-lg bg-[#1D8D94] flex items-center justify-center ">
                <Check className="w-5 h-5 text-white stroke-[3]" />
              </span>
            }
            sx={{
              marginRight: "9px",
              width: "32px",
              height: "32px",
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          />
          <Typography variant="FR" className="text-white">
            I Agree With the <span className="text-[#60A7F8]">AML policy</span>{" "}
            and <span className="text-[#60A7F8]">User Agreement. </span>{" "}
          </Typography>
        </div>
      </div>

      {error && (
        <Typography className="text-red-500 mt-4" variant="FI">
          {error}
        </Typography>
      )}

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
