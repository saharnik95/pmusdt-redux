import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Form from "@/components/organisms/Form";
import { updateUserProfile } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Typography } from "@mui/material";

//defining schema
const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

//infering schemas type

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //reading authentication status from store
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    navigate("/login");
    return null;
  }

  //defining formfields
  const fields: Array<{
    name: keyof EditProfileFormData;
    label: string;
    type: string;
    placeholder: string;
    showPasswordStrength?: boolean;
  }> = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter new name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter new email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter new password",
      showPasswordStrength: true,
    },
  ];

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const resultAction = await dispatch(
        //sending action to  update user

        updateUserProfile({ id: user.id, ...data }) //spreding name email and pass
      );
      if (updateUserProfile.fulfilled.match(resultAction)) {
        navigate("/login");
      } else if (updateUserProfile.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An error occurred while updating your profile.";
      alert(errorMsg);
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="flex flex-col w-full bg-form-background lg:pt-[38px] lg:pb-[61px]   xl:px-[160px] lg:px-[60px] md:px-[0px] md:pt-[28px] md:pb-[51px] pt-[18px] pb-[41px]  rounded-[20px]">
      <Typography variant="FH" className="text-white pl-6">
        Edit profile
      </Typography>
      <Form
        title=""
        fields={fields}
        schema={editProfileSchema}
        onSubmit={onSubmit}
        submitButtonText="Confirm"
      />
    </div>
  );
}
