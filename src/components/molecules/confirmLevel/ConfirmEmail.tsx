import { Input, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

interface ConfirmEmailProps {
  onEmailChange: (email: string) => void;
  initialEmail?: string;
}

export default function ConfirmEmail({
  onEmailChange,
  initialEmail = "",
}: ConfirmEmailProps) {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      onEmailChange(initialEmail);
    }
  }, [initialEmail, onEmailChange]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <Typography className="text-footer-text" variant="FI">
        Email:
      </Typography>
      <Input
        value={email}
        onChange={handleEmailChange}
        sx={{ color: "white" }}
        placeholder="Please enter your email"
        className="w-full text-white px-4 py-5 md:max-h-[57px] max-h-[47px] bg-primary-background border-none rounded-md focus:outline-none focus:ring-0 placeholder:text-white placeholder:text-sm placeholder:font-bold placeholder:leading-[18.2]"
      />
    </div>
  );
}
