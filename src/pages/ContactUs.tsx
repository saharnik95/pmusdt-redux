import ContactUsForm from "@/components/organisms/ContactUsForm";
import { z } from "zod";

const ContactUsSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactUsData = z.infer<typeof ContactUsSchema>;

export default function ContactUs() {
  const fields: {
    name: keyof ContactUsData;
    label: string;
    type: string;
    placeholder: string;
    rows?: number;
  }[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Enter your Subject",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Enter your Message",
      rows: 4, // Specify the number of rows for the message input
    },
  ];

  const onSubmit = async (data: ContactUsData): Promise<void> => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex lg:mb-[46px] md:my-16 my-8 items-center justify-center bg-primary-background">
      <ContactUsForm
        title="Contact Us"
        textHeader="Reach out and we will get in touch within 24 hours."
        fields={fields}
        schema={ContactUsSchema}
        onSubmit={onSubmit}
        submitButtonText="Submit"
      />
    </div>
  );
}
