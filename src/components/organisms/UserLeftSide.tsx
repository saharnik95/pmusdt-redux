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
}

// Default export for the UserLeftSide component
export default function UserLeftSide({
  setCurrentPage,
  currentPage,
}: {
  setCurrentPage: (pageName: string) => void;
  currentPage: string;
}) {
  const UserMenuItems: MenuItem[] = [
    {
      id: 1,
      icon: DashboardIconComponent,
      name: "Dashboard",
    },
    {
      id: 2,
      icon: ProfileIconComponent,
      name: "Profile",
    },
    {
      id: 3,
      icon: PartnerIconComponent,
      name: "Partner Program",
    },
    {
      id: 4,
      icon: ExitIconComponent,
      name: "Exit",
    },
  ];

  return (
    <div className="flex flex-col lg:gap-y-[40px] md:gap-y-7 gap-y-3  bg-form-background lg:pt-[38px] lg:pb-[45px] lg:w-[270px] md:pt-[30px] md:pb-[40px] md:basis-[175px] md:px-6  pt-[20px] pb-[30px] w-full px-2       rounded-[20px]">
      {UserMenuItems.map((item) => {
        const isSelected = currentPage === item.name;
        console.log("current page" + currentPage);
        console.log(item.name);
        console.log(isSelected);

        return (
          <div
            key={item.id}
            className={"flex md:gap-[14px] gap-1 cursor-pointer"}
            onClick={() => setCurrentPage(item.name)} // Pass the page name up to parent
          >
            <span
              className={`text-footer-text ${isSelected ? "text-white" : ""}`}
            >
              <item.icon color={isSelected ? "white" : "#ABABAB"} />
            </span>
            <Typography
              className={`text-footer-text text-nowrap ${
                isSelected ? "font-bold text-white" : ""
              }`}
              sx={{
                fontWeight: isSelected ? "semibold" : "normal",
                fontSize: { md: "18px", xs: "14px" },
                lineHeight: { md: "23.4px", xs: "20px" },
              }}
            >
              {item.name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
