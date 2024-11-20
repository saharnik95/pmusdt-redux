import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { user, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Explicitly type the fields array
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
      console.log("User from context:", user);

      console.log("Submitting data:", data);
      if (!user || !user.email) {
        throw new Error("Please log in again.");
      }

      const response = await authService.changePassword(
        user.email,
        data.newPassword
      );
      console.log("Password change response:", response);

      // Alert user
      alert("Password successfully changed. Logging out...");

      // Logout user
      console.log("Calling logout...");
      logout();
      console.log("Logout successful.");

      // Navigate to login page
      console.log("Navigating to login...");
      navigate("/login");
    } catch (error: any) {
      console.error("Error occurred:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-[150px]">
      <Form
        title="Change Password"
        fields={fields}
        schema={changePasswordSchema}
        onSubmit={onSubmit}
        submitButtonText="Change Password"
      />
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
}
