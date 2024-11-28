import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import Form from "@/components/organisms/Form";
import { changePassword, logout } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";

// Defining changePasswordSchema
const changePasswordSchema = z.object({
  password: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
});
//infering schemas type

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

//defining interface for location status
interface LocationState {
  email?: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as LocationState; //rading state from location that sent
    if (state && state.email) {
      setEmail(state.email);
    } else {
      const message =
        "Email not provided. Please start from the forgot password page.";
      alert(message);
      navigate("/forgot-password");
    }
  }, [location, navigate]);
  //defining form fields
  const fields: {
    name: keyof ChangePasswordFormData;
    label: string;
    type: string;
    placeholder: string;
    showPasswordStrength?: boolean;
  }[] = [
    {
      name: "password",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
      showPasswordStrength: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your new password",
      showPasswordStrength: false,
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
        throw new Error("Passwords do not match");
      }

      const resultAction = await dispatch(
        //sending action to change password

        changePassword({ email, newPassword: data.password })
      );
      if (changePassword.fulfilled.match(resultAction)) {
        alert(
          "Password successfully changed. Please log in with your new password."
        );
        dispatch(logout());
        navigate("/login");
      } else if (changePassword.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof Error) {
        throw { form: error.message };
      } else {
        throw {
          form: "An unexpected error occurred while changing the password.",
        };
      }
    }
  };

  return (
    <div className="flex lg:mt-[204px] lg:mb-[89px] md:my-16 my-8 items-center justify-center bg-primary-background">
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
