import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { registerUser } from "../store/authSlice";
import { AppDispatch } from "../store/store";
//defining schema

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
//infering schemas type

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //defining formfields

  const fields: Array<{
    name: keyof RegisterFormData;
    label: string;
    type: string;
    placeholder: string;
    showPasswordStrength?: boolean;
  }> = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
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
      showPasswordStrength: true,
    },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      registerSchema.parse(data); //validating with registerSchema
      const resultAction = await dispatch(registerUser(data)); //sending action to register

      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else if (registerUser.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string });
        throw formattedErrors;
      } else if (error instanceof Error) {
        if (error.message === "EMAIL_ALREADY_REGISTERED") {
          throw { email: "This email is already registered" };
        } else {
          throw { form: "An unexpected error occurred during registration" };
        }
      } else {
        throw { form: "An unexpected error occurred during registration" };
      }
    }
  };

  return (
    <div className="flex items-center justify-center lg:mb-[114px] lg:mt-[85px] md:my-16 my-8">
      <Form
        title="Register"
        fields={fields}
        schema={registerSchema}
        onSubmit={onSubmit}
        submitButtonText="Register"
        footerText="Have an account?"
        footerLinkText="Login"
        footerLinkTo="/login"
      />
    </div>
  );
}
