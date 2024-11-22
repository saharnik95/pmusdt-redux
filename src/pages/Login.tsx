import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";
import { useAuth } from "@/services/authContext";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

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

  const onSubmit = async (data: LoginFormData, keepLoggedIn: boolean) => {
    try {
      loginSchema.parse(data);
      const user = await authService.login(data.email, data.password);
      await login(user.name, user.email, data.password, keepLoggedIn);
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string });
        throw formattedErrors;
      } else if (error instanceof Error) {
        if (error.message === "EMAIL_NOT_FOUND") {
          setError("The Email is Incorrect");
        } else if (error.message === "INVALID_PASSWORD") {
          setError("The Password is Incorrect");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex lg:my-[152px] items-center justify-center bg-primary-background">
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
