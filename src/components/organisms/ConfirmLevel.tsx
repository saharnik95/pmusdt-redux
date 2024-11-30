import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox, Divider, Typography } from "@mui/material";
import ConfirmEmail from "../molecules/confirmLevel/ConfirmEmail";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ConfirmLevelRules from "../molecules/confirmLevel/ConfirmLevelRules";
import { RootState, AppDispatch } from "@/store/store";
import { loginUser } from "@/store/authSlice";

interface ConfirmLevelProps {
  onNext: () => void;
}

const validationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function ConfirmLevel({ onNext }: ConfirmLevelProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error: authError } = useSelector(
    (state: RootState) => state.auth
  );
  const { exchangeInfo } = useSelector((state: RootState) => state.exchange);

  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setAgreed(false);
    setKeepLoggedIn(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (authError) {
      if (authError === "EMAIL_NOT_FOUND") {
        setEmailError("Email doesn't exist. Please register.");
        setTimeout(() => navigate("/register"), 3000);
      } else if (authError === "INVALID_PASSWORD") {
        setPasswordError("Incorrect password. Please try again.");
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  }, [authError, navigate]);

  const handleConfirm = async () => {
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    if (!agreed) {
      setGeneralError("Please agree to the terms.");
      return;
    }

    if (isAuthenticated) {
      onNext();
      return;
    }

    try {
      validationSchema.parse({ email, password });
      const resultAction = await dispatch(
        loginUser({ email, password, keepLoggedIn })
      );
      if (loginUser.fulfilled.match(resultAction)) {
        onNext();
      }
    } catch (error) {
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

      {generalError && (
        <Typography className="text-red-500 mt-4" variant="FI">
          {generalError}
        </Typography>
      )}

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
