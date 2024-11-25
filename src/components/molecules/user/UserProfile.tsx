import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "@/components/organisms/Form";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/authContext";
import { Typography } from "@mui/material";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function UserProfile() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const fields: Array<{
    name: keyof RegisterFormData;
    label: string;
    type: string;
    placeholder: string;
  }> = [
    {
      name: "name",
      label: "Name:",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email:",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password:",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const user = await authService.register(
        data.name,
        data.email,
        data.password
      );
      login(user.name, user.email, user.password, false);
      navigate("/");
    } catch (error) {
      const errorMsg =
        error || "An error occurred while changing the password.";
      alert(errorMsg);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex flex-col   bg-form-background lg:pt-[38px] lg:pb-[45px] lg:w-[850px]  lg:px-[181px]  rounded-[20px]">
      <Typography
        className="text-white flex justify-start w-full text-start"
        variant="FH"
      >
        Edit profile
      </Typography>
      <Form
        title=""
        fields={fields}
        schema={registerSchema}
        onSubmit={onSubmit}
        submitButtonText="confirm"
      />
    </div>
  );
}
