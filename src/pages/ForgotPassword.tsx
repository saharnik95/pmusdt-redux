import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { authService } from "../services/authService";

//Defining forgotPasswordSchema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();

  //Defining Formfields
  const fields: {
    name: keyof ForgotPasswordFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Please enter your email",
    },
  ];

  //Handling onSubmit
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      forgotPasswordSchema.parse(data);
      await authService.forgotPassword(data.email);
      navigate("/change-password", { state: { email: data.email } });
      {
        /*sending Email as an State to next Page */
      }
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
          throw { email: "No account found with this email address" };
        } else {
          throw { email: "No account found with this email address" };
        }
      } else {
        // Handle generic unexpected errors
        throw { email: "An unexpected error occurred" };
      }
    }
  };

  return (
    <div className="flex lg:mb-[238px] lg:mt-[159px] md:my-16 my-8 items-center justify-center bg-primary-background">
      <Form
        title="Forgot Password"
        fields={fields}
        schema={forgotPasswordSchema}
        onSubmit={onSubmit}
        submitButtonText="Confirm"
      />
    </div>
  );
}
