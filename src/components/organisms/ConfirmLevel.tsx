import { useState, useEffect } from "react";
import { Button, Checkbox, Divider, Typography } from "@mui/material";
import ConfirmEmail from "../molecules/confirmLevel/ConfirmEmail";
import { Check } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { z } from "zod";
import ConfirmLevelRules from "@/components/molecules/confirmLevel/ConfirmLevelRules";

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

// Define Zod schema for email and password validation
const validationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function ConfirmLevel({
  onNext,
  exchangeInfo,
}: ConfirmLevelProps) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved email from localStorage on component mount
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }

    // Reset agreed state when component mounts or authentication status changes
    setAgreed(false);
    setKeepLoggedIn(false);
  }, [isAuthenticated]);

  const handleConfirm = async () => {
    // Reset all error states
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    // Check if user agreed to terms
    if (!agreed) {
      setGeneralError("Please agree to the terms.");
      return;
    }

    if (isAuthenticated) {
      // If already authenticated, proceed to next step
      onNext();
      return;
    }

    try {
      // Validate email and password using Zod schema
      validationSchema.parse({ email, password });

      try {
        // Attempt to log in
        const user = await authService.login(email, password);
        await login(user.name, user.email, password, keepLoggedIn);
        if (keepLoggedIn) {
          localStorage.setItem("userEmail", user.email);
        }
        onNext();
      } catch (error) {
        // Handle login errors
        if (error instanceof Error) {
          if (error.message === "EMAIL_NOT_FOUND") {
            setEmailError("Email doesn't exist. Please register.");
            setTimeout(() => navigate("/register"), 3000);
          } else if (error.message === "INVALID_PASSWORD") {
            setPasswordError("Incorrect password. Please try again.");
          } else {
            setGeneralError("An unexpected error occurred. Please try again.");
          }
        }
      }
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === "email") {
            setEmailError(err.message);
          } else if (err.path[0] === "password") {
            setPasswordError(err.message);
          }
        });
      }
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
        Invoice Details:
      </Typography>

      {/* Display exchange information */}
      <div className="flex flex-row justify-between items-center lg:mt-[43px] md:mt-[33px] mt-[23px]">
        <Typography variant="FT" className="text-footer-text">
          Send:
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
          Receive:
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

      {/* Render ConfirmEmail component if user is not authenticated */}
      {!isAuthenticated && (
        <>
          <ConfirmEmail
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            emailError={emailError || undefined}
            passwordError={passwordError || undefined}
          />
          {/* Keep me logged in checkbox */}
          <div className="flex items-center mt-4">
            <Checkbox
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              icon={<span className="w-6 h-6 rounded-lg bg-[#242C39]" />}
              checkedIcon={
                <span className="w-6 h-6 rounded-lg bg-form-buttonBackground flex items-center justify-center">
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                </span>
              }
              sx={{
                marginRight: "9px",
                width: "24px",
                height: "24px",
                padding: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Typography variant="FR" className="text-white">
              Keep me logged in
            </Typography>
          </div>
        </>
      )}

      <ConfirmLevelRules />

      {/* Agreement checkbox */}
      <div className="flex flex-row mt-8">
        <div className="flex items-center">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            icon={<span className="w-8 h-8 rounded-lg bg-[#242C39]" />}
            checkedIcon={
              <span className="w-8 h-8 rounded-lg bg-form-buttonBackground flex items-center justify-center ">
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

      {/* Display general error message */}
      {generalError && (
        <Typography className="text-red-500 mt-4" variant="FI">
          {generalError}
        </Typography>
      )}

      {/* Confirm button */}
      <div className="w-full flex justify-center">
        <Button
          onClick={handleConfirm}
          disabled={!agreed}
          sx={{
            marginTop: "42px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)",
            backgroundColor: (theme) => theme.palette.form.buttonBackground,
            "&:disabled": {
              backgroundColor: (theme) =>
                theme.palette.action.disabledBackground,
              color: (theme) => theme.palette.action.disabled,
            },
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
