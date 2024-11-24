import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import Form from "@/components/organisms/Form";
import { useAuth } from "@/context/authContext";
import { authService } from "@/services/authService";

// Defining changePasswordSchema
const changePasswordSchema = z.object({
  password: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface LocationState {
  email?: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state && state.email) {
      setEmail(state.email);
    } else {
      const message =
        "Email not provided. Please start from the forgot password page.";
      alert(message);
      navigate("/forgot-password");
    }
  }, [location, navigate]);

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

  const onSubmit = async (data: ChangePasswordFormData): Promise<void> => {
    try {
      if (!email) {
        throw new Error(
          "Email not provided. Please start from the forgot password page."
        );
      }

      // Check if passwords match
      if (data.password !== data.confirmPassword) {
        throw { confirmPassword: "Passwords do not match" };
      }

      const response = await authService.changePassword(email, data.password);
      console.log("Password change response:", response);

      alert(
        "Password successfully changed. Please log in with your new password."
      );
      logout();
      navigate("/login");
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (error instanceof Error) {
        throw { form: error.message };
      } else if (typeof error === "object" && error !== null) {
        throw error;
      } else {
        throw {
          form: "An unexpected error occurred while changing the password.",
        };
      }
    }
  };

  return (
    <div className="flex lg:mt-[204px] lg:mb-[89px]  md:my-16 my-8  items-center justify-center bg-primary-background">
      <Form
        title="Change Password"
        fields={fields}
        schema={changePasswordSchema}
        onSubmit={onSubmit}
        submitButtonText="Change Password"
        showPasswordStrength={true}
      />
    </div>
  );
}
