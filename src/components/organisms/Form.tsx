import { useState, useEffect } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  Path,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Typography, Checkbox, FormControlLabel } from "@mui/material";
import Button from "@/components/atoms/form/Button";
import Input from "@/components/atoms/form/Input";
import FormFooter from "@/components/molecules/form/FormFooter";
import { checkPasswordStrength } from "@/utils/PasswordStrength";

//Defining InterFaces
interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  showPasswordStrength?: boolean;
}

interface FormProps<T extends z.ZodType<any, any>> {
  title: string;
  fields: FormField<z.infer<T>>[];
  schema: T;
  onSubmit: (data: z.infer<T>, keepLoggedIn: boolean) => Promise<void>;
  submitButtonText: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;
  showKeepLoggedIn?: boolean;
  showForgotPassword?: boolean;
}

export default function Form<T extends z.ZodType<any, any>>({
  title,
  fields,
  schema,
  onSubmit,
  submitButtonText,
  footerText,
  footerLinkText,
  footerLinkTo,
  showKeepLoggedIn = false,
  showForgotPassword = false,
}: FormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  //Initializing default field values
  type FormData = z.infer<T>;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as FormData),
  });

  //Hnadling FormSubmit
  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsLoading(true);
    setFormError(null);
    clearErrors();
    try {
      await onSubmit(data, keepLoggedIn);
    } catch (err) {
      if (err && typeof err === "object") {
        Object.entries(err).forEach(([key, message]) => {
          if (key === "form") {
            setFormError(message as string);
          } else {
            setError(key as Path<FormData>, {
              type: "manual",
              message: message as string,
            });
          }
        });
      } else {
        setFormError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Handling Input Clear
  const handleClearInput = (fieldName: Path<FormData>) => {
    setValue(fieldName, "" as z.infer<T>[typeof fieldName]);
    clearErrors(fieldName);
  };

  // Watch for password changes
  const watchPassword = watch("password" as Path<FormData>);

  // Update password strength when password changes
  useEffect(() => {
    if (watchPassword) {
      setPasswordStrength(checkPasswordStrength(watchPassword));
    } else {
      setPasswordStrength("");
    }
  }, [watchPassword]);

  return (
    <div className="flex flex-col items-center justify-center bg-form-background rounded-[30px] pt-8 pb-12 px-6 lg:w-[560px] md:w-[500px] w-[340px]">
      {/*Header*/}
      <Typography
        component="h1"
        variant="FB"
        align="center"
        className="text-primary-foreground text-center font-niramit text-transparent bg-clip-text bg-gradient-to-r from-form-buttonBackground to-[#99D9A6] pb-[31px]"
      >
        {title}
      </Typography>

      {/*Form*/}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full flex flex-col gap-y-[22px] "
      >
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="relative">
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={value || ""}
                  onChange={onChange}
                  onClear={() => handleClearInput(field.name)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  placeholder={field.placeholder}
                />
                {field.type === "password" &&
                  passwordStrength &&
                  field.showPasswordStrength && (
                    <span className="">
                      <Typography
                        variant="FI"
                        className={`absolute right-0 bottom-[76px] ${
                          passwordStrength === "Strong!"
                            ? "text-[#6EC207]"
                            : passwordStrength === "Medium"
                            ? "text-[#FF6600]"
                            : "text-form-fail"
                        }`}
                      >
                        {passwordStrength}
                      </Typography>
                    </span>
                  )}
              </div>
            )}
          />
        ))}

        {/*Keep Login AND ShowForgotPassword */}

        {(showKeepLoggedIn || showForgotPassword) && (
          <div className="flex justify-between items-center">
            {showKeepLoggedIn && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    sx={{
                      borderRadius: "3px",
                      paddingLeft: 1,
                      paddingTop: 0,
                      paddingBottom: 0,
                      color: "#5B5F5E",
                      "&.Mui-checked": {
                        color: "#1D8D94",
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="FI" sx={{ color: "#ABABAB" }}>
                    Keep Me Logged In
                  </Typography>
                }
              />
            )}

            {showForgotPassword && (
              <Link
                to="/forgot-password"
                className="text-sm text-form-buttonBackground hover:underline"
              >
                <Typography
                  variant="FI"
                  sx={{
                    color: (theme) => theme.palette.form.buttonBackground,
                    textDecoration: "underline",
                  }}
                >
                  Forgot your password?
                </Typography>
              </Link>
            )}
          </div>
        )}

        {/*Submit Button */}

        {formError && <p className="text-sm text-form-fail">{formError}</p>}
        <div className="pt-4">
          <Button disabled={isLoading}>
            <Typography variant="FI" className="text-white">
              {isLoading ? "Loading..." : submitButtonText}
            </Typography>
          </Button>
        </div>
      </form>

      {/*Footer */}

      {footerText && footerLinkText && footerLinkTo && (
        <FormFooter
          text={footerText}
          linkText={footerLinkText}
          linkTo={footerLinkTo}
        />
      )}
    </div>
  );
}
