import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuOutlined";
const MenuToggle = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    className="text-primary-foreground"
    edge="end"
    aria-label="menu"
    onClick={onClick}
    sx={{ ml: "auto", color: "white" }}
  >
    <MenuIcon />
  </IconButton>
);
export default MenuToggle;
