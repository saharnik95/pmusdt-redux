import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";
import { useAuth } from "@/services/authContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // The `name` property now strictly matches the keys defined in the schema
  const fields: {
    name: keyof LoginFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await authService.login(data.email, data.password);
      login(user.name, user.email, user.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-background">
      <Form
        title="Login"
        fields={fields}
        schema={loginSchema}
        onSubmit={onSubmit}
        submitButtonText="Login"
        footerText="Don't have an account?"
        footerLinkText="Register"
        footerLinkTo="/register"
        showKeepLoggedIn={true}
        showForgotPassword={true}
      />
    </div>
  );
}
