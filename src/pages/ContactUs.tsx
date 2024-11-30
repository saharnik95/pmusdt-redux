import { useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import ContactUsForm from "@/components/organisms/ContactUsForm";

//defining schema
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
//infering schemas type

type ContactUsData = z.infer<typeof ContactUsSchema>;

export default function ContactUs() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  //defining formfields

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
      rows: 4,
    },
  ];

  const onSubmit = async (data: ContactUsData): Promise<void> => {
    try {
      const result = await emailjs.send(
        "service_qnmc27k",
        "template_vt8y2tn",
        {
          to_email: "recipient@example.com",
          from_name: data.email,
          subject: data.subject,
          message: data.message,
        },
        "CFqxeGkDMqO1dWLjK"
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="flex flex-col lg:mb-[46px] md:my-16 my-8 items-center justify-center bg-primary-background">
      <ContactUsForm
        title="Contact Us"
        textHeader="Reach out and we will get in touch within 24 hours."
        fields={fields}
        schema={ContactUsSchema}
        onSubmit={onSubmit}
        submitButtonText="Send"
      />
      {submitStatus === "success" && (
        <p className="mt-4 text-green-500">Email sent successfully!</p>
      )}
      {submitStatus === "error" && (
        <p className="mt-4 text-red-500">
          Failed to send email. Please try again.
        </p>
      )}
    </div>
  );
}
