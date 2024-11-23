import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "@/assets/images/Logo.png";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      {" "}
      {/* Wrap with Link */}
      <img src={logo} alt="Logo" className="md:w-17 md:h-17 mr-2" />
      <Typography
        variant="LM"
        className="text-primary-foreground font-russoone text-transparent bg-clip-text bg-gradient-to-r from-[#1D8D94] to-[#99D9A6] flex"
      >
        PMUSDT.COM
      </Typography>
    </Link>
  );
};

export default Logo;
