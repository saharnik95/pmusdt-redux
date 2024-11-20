import React from "react";
import Logo from "../atoms/header/Logo";
import MainMenu from "../molecules/header/MainMenu";
import LoginAndRegister from "../molecules/header/LoginAndRegister";
import { useAuth } from "@/services/authContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { Typography } from "@mui/material";

export default function Header() {
  const { user, logout } = useAuth(); // Access user and logout from the context
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Function to navigate to the change password page
  const goToChangePassword = () => {
    navigate("/change-password"); // Navigate to the change password page
  };

  return (
    <div className="w-full flex justify-between lg:gap-36 lg:py-12 md:gap-8 gap-4 md:px-8 md:py-6 px-4 py-6 max-w-[1024px]">
      <Logo />
      <div className="flex flex-row-reverse sm:flex-row justify-between lg:gap-36 md:gap-8 gap-4">
        <MainMenu />

        {/* Conditional rendering based on user state */}
        {user ? (
          <div className="flex items-center gap-4">
            <Typography
              className="text-primary-foreground text-nowrap"
              variant="MM"
            >
              Hi {user.name}
            </Typography>
            <button onClick={logout} className="">
              <Typography className="text-primary-foreground" variant="MM">
                Logout
              </Typography>{" "}
            </button>
            <button onClick={goToChangePassword} className="">
              <Typography
                className="text-primary-foreground text-nowrap"
                variant="MM"
              >
                Change Password
              </Typography>{" "}
            </button>
          </div>
        ) : (
          <LoginAndRegister />
        )}
      </div>
    </div>
  );
}
