import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react"; // Import the cross icon
import { Typography } from "@mui/material";
import CrossIconComponent from "@/components/icons/CrossIconComponent";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void; // Added callback to clear input
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}
export default function Input({
  label,
  name,
  type,
  value,
  onChange,
  onClear, // Used to clear the input
  error,
  helperText,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium text-form-text mb-2">
        <Typography variant="FI">{label}</Typography>
      </label>
      <div className="relative">
        {/* If the field is email and there's an error, show the cross icon */}
        {name === "email" && error && value && (
          <button
            type="button"
            onClick={onClear} // Clear input when clicked
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <CrossIconComponent className="h-5 w-5 text-red-500" />
          </button>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
              error ? "text-red-500" : "text-gray-400"
            }`}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}

        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-white px-4 py-5 max-h-[57px] bg-primary-background border-none rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "ring-2 ring-[#F66066] text-[#F66066]" : ""
          } ${
            type === "password" ? "pr-10" : ""
          } focus:ring-0 placeholder:text-white placeholder:text-sm placeholder:font-bold placeholder:leading-[18.2]`}
        />
      </div>
      {error && helperText && (
        <p className="mt-1 text-xs text-[#F66066]">{helperText}</p>
      )}
    </div>
  );
}
