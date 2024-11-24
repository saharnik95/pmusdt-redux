{
  /*Designed Input For the Home Login/Register*/
}
import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import {
  Typography,
  InputBase,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CrossIconComponent from "@/components/icons/CrossIconComponent";
import EyeIconComponent from "@/components/icons/EyeIconComponent";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const StyledInputBase = styled(InputBase)(({}) => ({
  "& .MuiInputBase-input": {
    width: "100%",
    color: "white",
    padding: "20px 16px",
    paddingRight: "40px", // Add space for the icons
    maxHeight: "57px",
    backgroundColor: "#242C39",
    border: "none",
    borderRadius: "6px",
    "&::placeholder": {
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      lineHeight: "18.2px",
      opacity: 1,
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 2px var(--primary)",
    },
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
  },
}));

export default function Input({
  label,
  name,
  type,
  value,
  onChange,
  onClear,
  error,
  helperText,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      <label
        htmlFor={name}
        className="block font-medium text-footer-text mb-[15px]"
      >
        <Typography variant="FI">{label}</Typography>
      </label>
      <div className="relative">
        <StyledInputBase
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              {/* If the field is email and there's an error, show the cross icon */}
              {name === "email" && error && value && (
                <IconButton
                  onClick={onClear}
                  edge="end"
                  size="small"
                  sx={{ padding: 0 }}
                >
                  <CrossIconComponent className="h-5 w-5 text-form-fail" />
                </IconButton>
              )}
              {/* If the field is password, show the eye icon */}
              {type === "password" && (
                <IconButton
                  onClick={toggleShowPassword}
                  edge="end"
                  size="small"
                  className={error ? "text-form-fail" : "text-[#ABABAB]"}
                  sx={{
                    padding: 0,
                    color: error
                      ? (theme) => theme.palette.form.fail
                      : (theme) => theme.palette.footer.text,
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" color="currentColor" />
                  ) : (
                    <EyeIconComponent
                      className="h-5 w-5"
                      color="currentColor"
                    />
                  )}
                </IconButton>
              )}
            </InputAdornment>
          }
          sx={{
            "& .MuiInputBase-input": {
              ...(error && {
                boxShadow: "0 0 0 2px #F66066",
                color: (theme) => theme.palette.form.fail,
              }),
            },
          }}
        />
      </div>
      {error && helperText && (
        <p className="mt-1 text-xs text-form-fail">{helperText}</p>
      )}
    </div>
  );
}
