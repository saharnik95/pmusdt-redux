import React from "react";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const fields = [
    {
      name: "email" as const,
      label: "Email Address",
      type: "email",
      placeholder: "Please enter your email",
    },
  ];

  const onSubmit = async (data: ForgotPasswordFormData): Promise<void> => {
    try {
      await authService.forgotPassword(data.email);
      // Instead of returning a string, we'll use an alert to show the success message
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Password reset failed:", error);
      throw new Error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center my-[150px]">
      <Form
        title="Forgot Password"
        fields={fields}
        schema={forgotPasswordSchema}
        onSubmit={onSubmit}
        submitButtonText="Confirm"
        footerLinkText="Login"
        footerLinkTo="/login"
      />
    </div>
  );
}
