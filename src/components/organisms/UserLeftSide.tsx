import { NavLink, useLocation } from "react-router-dom";
import ProfileIconComponent from "../icons/ProfileIconComponent";
import PartnerIconComponent from "../icons/PartnerIconComponent";
import ExitIconComponent from "../icons/ExitIconComponent";
import DashboardIconComponent from "../icons/DashboardIconComponent";

import { Typography } from "@mui/material";

type IconComponentType = React.FC<{ color?: string }>;

// Define the type for the MenuItem
interface MenuItem {
  id: number;
  icon: IconComponentType;
  name: string;
  path: string;
}

export default function UserLeftSide({
  setCurrentPage,
  currentPage,
}: {
  setCurrentPage: (pageName: string) => void;
  currentPage: string;
}) {
  const location = useLocation();

  const UserMenuItems: MenuItem[] = [
    {
      id: 1,
      icon: DashboardIconComponent,
      name: "Dashboard",
      path: "/user/dashboard",
    },
    {
      id: 2,
      icon: ProfileIconComponent,
      name: "Profile",
      path: "/user/profile",
    },
    {
      id: 3,
      icon: PartnerIconComponent,
      name: "Partner Program",
      path: "/user/partner",
    },
    {
      id: 4,
      icon: ExitIconComponent,
      name: "Exit",
      path: "/login",
    },
  ];

  return (
    <div className="flex flex-col lg:gap-y-[40px] md:gap-y-7 gap-y-3  bg-form-background xl:px-8 lg:pt-[38px] lg:pb-[45px] lg:w-[270px] md:pt-[30px] md:pb-[40px] md:basis-[145px] md:px-3  pt-[20px] pb-[30px] w-full px-2       rounded-[20px]">
      {UserMenuItems.map((item) => {
        const isSelected = location.pathname === item.path;
        console.log("current page" + currentPage);
        console.log(item.name);

        console.log(isSelected);

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex md:gap-[14px] gap-1 cursor-pointer ${
                isActive ? "text-white" : "text-footer-text"
              }`
            }
            onClick={() => setCurrentPage(item.name)} // Pass the page name up to parent
          >
            <span>
              <item.icon color={isSelected ? "white" : "#ABABAB"} />
            </span>
            <Typography
              className={`text-nowrap ${
                isSelected ? "font-bold text-white" : ""
              }`}
              sx={{
                fontWeight: isSelected ? "semibold" : "normal",
                fontSize: { md: "16px", xs: "14px" },
                lineHeight: { md: "20.4px", xs: "18px" },
              }}
            >
              {item.name}
            </Typography>
          </NavLink>
        );
      })}
    </div>
  );
}
