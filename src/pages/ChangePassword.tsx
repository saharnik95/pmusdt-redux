import { useState, useEffect } from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";
import { useAuth } from "@/context/authContext";

// Defining changePasswordSchema
const changePasswordSchema = z
  .object({
    password: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface LocationState {
  email?: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state: LocationState };
  const { logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Getting Email From Last Page and Checking if it exists
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      const message =
        "Email not provided. Please start from the forgot password page.";
      setErrorMessage(message);
      alert(message);
    }
  }, [location]);

  // Defining Formfields
  const fields: {
    name: keyof ChangePasswordFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "password",
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

  // Handling submit
  const onSubmit = async (data: ChangePasswordFormData): Promise<void> => {
    try {
      if (!email) {
        const message =
          "Email not provided. Please start from the forgot password page.";
        setErrorMessage(message);
        alert(message);
        throw new Error(message);
      }

      const response = await authService.changePassword(email, data.password);
      console.log("Password change response:", response);

      // Alert user
      alert(
        "Password successfully changed. Please log in with your new password."
      );

      // Logout user
      logout();

      // Navigate to login page
      navigate("/login");
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      let errorMsg = "An error occurred while changing the password.";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setErrorMessage(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="flex lg:my-[152px] items-center justify-center bg-primary-background">
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
