import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginOrRegister from "@/components/atoms/header/LoginOrRegister";
import PersonIconComponent from "@/components/icons/PersonIconComponent";

export default function LoginAndRegister() {
  return (
    <div className="flex items-center gap-x-3">
      <PersonIconComponent />
      <div className="flex">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LoginOrRegister label="Login " />
        </Link>
        <Typography
          variant="MM"
          className="text-primary-foreground"
          sx={{ margin: "0 2px" }}
        >
          /
        </Typography>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <LoginOrRegister label=" Register" />
        </Link>
      </div>
    </div>
  );
}
