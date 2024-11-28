import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/organisms/Form";
import { loginUser, restoreUser } from "../store/authSlice";
import { RootState, AppDispatch } from "../store/store";
//defining schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
//infering schemas type
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //reading authentication status from store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  //restoring user data on every mount
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  //if user was authenticated navigating home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  //defining formfields
  const fields: {
    name: keyof LoginFormData;
    label: string;
    type: string;
    placeholder: string;
    showPasswordStrength?: boolean;
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
      showPasswordStrength: false,
    },
  ];

  const onSubmit = async (data: LoginFormData, keepLoggedIn: boolean) => {
    try {
      loginSchema.parse(data); //validating with loginschema
      //sending action to login
      const resultAction = await dispatch(
        loginUser({ email: data.email, password: data.password, keepLoggedIn })
      );
      if (loginUser.fulfilled.match(resultAction)) {
        //checking if result action matches fullfiled
        navigate("/");
      } else if (loginUser.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as { [key: string]: string }); // turning a error into  fieldName: errorMessage/path: ['email'], message: 'Invalid email address'
        throw formattedErrors;
      } else if (error instanceof Error) {
        if (error.message === "EMAIL_NOT_FOUND") {
          throw { email: "The Email is Incorrect" };
        } else if (error.message === "INVALID_PASSWORD") {
          throw { password: "The Password is Incorrect" };
        } else {
          throw { form: "An unexpected error occurred" };
        }
      } else {
        throw { form: "An unexpected error occurred" };
      }
    }
  };

  return (
    <div className="flex lg:mb-[152px] lg:mt-[85px] md:my-16 my-8 items-center justify-center bg-primary-background">
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
