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
      login(user.name, user.email, user.password, keepLoggedIn);
      navigate("/");
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string });
        throw formattedErrors; // Pass these back to the Form component
      }
      // Handle specific errors from authService
      else if (error instanceof Error) {
        if (error.message === "EMAIL_NOT_FOUND") {
          throw { email: "The Email is Incorrect" };
        } else if (error.message === "INVALID_PASSWORD") {
          throw { password: "The Password is Incorrect" };
        } else {
          throw { form: "An unexpected error occurred" };
        }
      } else {
        // Handle generic unexpected errors
        throw { form: "An unexpected error occurred" };
      }
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
