import Logo from "../atoms/header/Logo";
import MainMenu from "../molecules/header/MainMenu";
import LoginAndRegister from "../molecules/header/LoginAndRegister";
import { useAuth } from "@/context/authContext";
import { Typography } from "@mui/material";
import PersonIconComponent from "../icons/PersonIconComponent";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full flex justify-between items-center lg:gap-36 lg:py-18 md:gap-2 gap-2 md:px-8 md:py-16 px-4 py-12 max-w-[1140px] xl:px-0 xl:mx-auto">
      <div className="order-1 ">
        <Logo />
      </div>

      <div className="md:order-2 order-3 ">
        <MainMenu />
      </div>
      {user ? (
        <div className="flex items-center md:gap-4  gap-2 order-2 md:order-">
          <span onClick={logout} className="cursor-pointer">
            <PersonIconComponent />
          </span>
          <Typography
            className="text-primary-foreground text-nowrap"
            variant="MM"
          >
            {user.name}
          </Typography>
        </div>
      ) : (
        <div className="md:order-3 md:flex hidden">
          <LoginAndRegister />
        </div>
      )}
    </div>
  );
}
