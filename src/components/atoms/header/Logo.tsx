import logo from "@/assets/images/Logo.png";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div className="flex items-center ">
      <img src={logo} alt="Logo" className="md:w-17 md:h-17  " />
      <Typography
        variant="LM"
        className="text-primary-foreground font-russoone  text-transparent bg-clip-text bg-gradient-to-r from-[#1D8D94] to-[#99D9A6]
        hidden md:flex"
      >
        PMUSDT.COM
      </Typography>
    </div>
  );
};

export default Logo;