import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { z } from "zod";
import Form from "../components/organisms/Form";
import { forgotPassword } from "../store/authSlice";
import { AppDispatch } from "../store/store";

//Defining forgotPasswordSchema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

//infering schemas type

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
      forgotPasswordSchema.parse(data); //validating with schema
      const resultAction = await dispatch(forgotPassword(data.email)); //sending action to forgot
      if (forgotPassword.fulfilled.match(resultAction)) {
        navigate("/change-password", { state: { email: data.email } }); //sending email as an state to change password page
      } else if (forgotPassword.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          // turning a error into  fieldName: errorMessage/path: ['email'], message: 'Invalid email address'
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string });
        throw formattedErrors; // Pass these back to the Form component
      }
      // Handle specific errors from forgotPassword action
      else if (error instanceof Error) {
        if (error.message === "EMAIL_NOT_FOUND") {
          throw { email: "No account found with this email address" };
        } else {
          throw { email: "An unexpected error occurred" };
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
