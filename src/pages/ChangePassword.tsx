import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";
import { useAuth } from "@/services/authContext";

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { email?: string } | undefined;
    if (state && state.email) {
      setEmail(state.email);
    } else {
      setErrorMessage(
        "Email not provided. Please start from the forgot password page."
      );
    }
  }, [location]);

  const fields: {
    name: keyof ChangePasswordFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your new password",
    },
  ];

  const onSubmit = async (data: ChangePasswordFormData): Promise<void> => {
    try {
      if (!email) {
        throw new Error(
          "Email not provided. Please start from the forgot password page."
        );
      }

      const response = await authService.changePassword(
        email,
        data.newPassword
      );
      console.log("Password change response:", response);

      // Alert user
      alert(
        "Password successfully changed. Please log in with your new password."
      );

      // Logout user
      logout();

      // Navigate to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Error occurred:", error);
      setErrorMessage(error.message);
    }
  };

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center my-[150px]">
        <div className="text-red-500">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center my-[150px]">
      <Form
        title="Change Password"
        fields={fields}
        schema={changePasswordSchema}
        onSubmit={onSubmit}
        submitButtonText="Change Password"
      />
    </div>
  );
}
