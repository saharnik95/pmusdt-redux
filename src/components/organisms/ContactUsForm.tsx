import { useState } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  Path,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/form/Button";
import Input from "@/components/atoms/form/Input";

interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  rows?: number; // Add this line to allow specifying the number of rows for textarea
}

interface FormProps<T extends z.ZodType<any, any>> {
  title: string;
  fields: FormField<z.infer<T>>[];
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  submitButtonText: string;
  textHeader: string;
}

export default function ContactUsForm<T extends z.ZodType<any, any>>({
  title,
  fields,
  schema,
  onSubmit,
  submitButtonText,
  textHeader,
}: FormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  type FormData = z.infer<T>;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as FormData),
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsLoading(true);
    setFormError(null);
    clearErrors();
    try {
      await onSubmit(data);
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

  return (
    <div className="flex flex-col items-start bg-form-background rounded-[30px] pt-8 pb-12 px-6 lg:w-[560px] md:w-[500px] w-[340px]">
      <Typography
        component="h1"
        variant="FB"
        align="center"
        className="text-primary-foreground text-center font-niramit text-transparent bg-clip-text bg-gradient-to-r from-form-buttonBackground to-[#99D9A6]"
      >
        {title}
      </Typography>
      <span className="mb-8 mt-3">
        <Typography variant="FI" className="text-footer-text text-nowrap">
          {textHeader}
        </Typography>
      </span>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full flex flex-col gap-y-[22px]"
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
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  placeholder={field.placeholder}
                  rows={field.rows} // Pass the rows prop to the Input component
                />
              </div>
            )}
          />
        ))}

        {formError && <p className="text-sm text-form-fail">{formError}</p>}
        <div className="pt-4">
          <Button disabled={isLoading}>
            <Typography variant="FI" className="text-white">
              {isLoading ? "Loading..." : submitButtonText}
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
}
