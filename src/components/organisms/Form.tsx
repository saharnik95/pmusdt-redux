import { useState } from "react";
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

interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
  rules?: { required: string };
  placeholder?: string;
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
  const [error, setError] = useState<string | null>(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  type FormData = z.infer<T>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: formSetError,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as FormData),
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(data, keepLoggedIn);
    } catch (err) {
      if (err && typeof err === "object") {
        Object.entries(err).forEach(([key, message]) => {
          formSetError(key as Path<FormData>, {
            type: "manual",
            message: message as string,
          });
        });
      } else {
        formSetError("root" as Path<FormData>, {
          type: "manual",
          message: err instanceof Error ? err.message : "An error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInput = (fieldName: Path<FormData>) => {
    setValue(fieldName, "" as any);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-form-background rounded-[30px] pt-8 pb-12 px-6 lg:w-[560px] md:w-[500px] w-[340px] ">
      <Typography
        component="h1"
        variant="FB"
        align="center"
        className="text-primary-foreground text-center font-niramit text-transparent bg-clip-text bg-gradient-to-r from-[#1D8D94] to-[#99D9A6] pb-[31px]"
      >
        {title}
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full space-y-[27px]"
      >
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange, value } }) => (
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
            )}
          />
        ))}
        {(showKeepLoggedIn || showForgotPassword) && (
          <div className="flex justify-between items-center ">
            {showKeepLoggedIn && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    sx={{
                      paddingLeft: 1,
                      color: "#5B5F5E",
                      "&.Mui-checked": {
                        color: "#1D8D94",
                        backgroundColor: "",
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="FI" sx={{ color: "#ABABAB" }}>
                    Keep Me Login
                  </Typography>
                }
              />
            )}
            {showForgotPassword && (
              <Link
                to="/forgot-password"
                className="text-sm text-[#1D8D94] hover:underline"
              >
                <Typography
                  variant="FI"
                  sx={{ color: "#1D8D94", textDecoration: "underline" }}
                >
                  Forgot your password?
                </Typography>
              </Link>
            )}
          </div>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="pt-4">
          <Button disabled={isLoading}>
            {isLoading ? "Loading..." : submitButtonText}
          </Button>
        </div>
      </form>
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
