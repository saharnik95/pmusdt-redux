import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const menuItems = [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: "Blog", link: "/blog" },
    { text: "FAQ", link: "/faq" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/register" },
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        {menuItems.map(({ text, link }) => (
          <ListItem
            key={text}
            component={Link}
            to={link}
            onClick={onClose}
            style={{
              textAlign: "left",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileMenu;
