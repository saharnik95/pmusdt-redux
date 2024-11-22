import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  {
    /*checking which page is active */
  }
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href} className="flex items-center gap-2 no-underline">
      {isActive && <div className="w-2 h-2 rounded-full bg-[#40A578]" />}
      <h3
        className={`text-primary-foreground md:text-[16px] text-[10px] text-nowrap ${
          isActive ? "font-bold" : "font-normal"
        }`}
      >
        {children}
      </h3>
    </Link>
  );
};

export default MenuItem;
