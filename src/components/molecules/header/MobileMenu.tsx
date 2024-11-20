import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Drawer anchor="left" open={isOpen} onClose={onClose}>
    <List>
      {["Home", "About Us", "Contact Us", "Blog", "FAQ"].map((text) => (
        <ListItem
          key={text}
          component="button"
          onClick={onClose}
          style={{ textAlign: "left" }}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default MobileMenu;
