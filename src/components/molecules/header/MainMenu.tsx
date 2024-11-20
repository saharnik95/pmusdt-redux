import React from "react";

import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MenuToggle from "@/components/atoms/header/MenuToggle";
import MobileMenu from "./MobileMenu";
import MenuItem from "@/components/atoms/header/MenuItem";

export default function MainMenu() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex items-center">
      <div>
        {isMobile ? (
          <>
            <MenuToggle onClick={handleDrawerToggle} />
            <MobileMenu isOpen={mobileOpen} onClose={handleDrawerToggle} />
          </>
        ) : (
          <div className="flex lg:gap-8 md:gap-4">
            <MenuItem href="/">Home</MenuItem>
            <MenuItem href="/about">About Us</MenuItem>
            <MenuItem href="/contact">Contact Us</MenuItem>
            <MenuItem href="/blog">Blog</MenuItem>
            <MenuItem href="/faq">FAQ</MenuItem>
          </div>
        )}
      </div>
    </div>
  );
}
