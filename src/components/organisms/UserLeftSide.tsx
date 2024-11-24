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

// Export the selectRightSide function
export const selectRightSide = (currentPage: string) => {
  if (currentPage === "Dashboard") {
    return <div>Dashboard Content</div>; // Use your actual component like <UserDashboard />
  } else if (currentPage === "Profile") {
    return <div>Profile Content</div>; // Use your actual component like <UserProfile />
  } else if (currentPage === "Partner Program") {
    return <div>Partner Program Content</div>; // Use your actual component like <UserPartner />
  }
};

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
    <div className="flex flex-col gap-y-[40px] bg-form-background lg:pt-[38px] lg:pb-[45px] lg:w-[270px] lg:px-8 lg:gap-[38px] rounded-[20px]">
      {UserMenuItems.map((item) => {
        const isSelected = currentPage === item.name;
        console.log("current page" + currentPage);
        console.log(item.name);

        console.log(isSelected);

        return (
          <div
            key={item.id}
            className={"flex gap-[14px] cursor-pointer"}
            onClick={() => setCurrentPage(item.name)} // Pass the page name up to parent
          >
            <span
              className={`text-form-text ${isSelected ? "text-white" : ""}`}
            >
              <item.icon color={isSelected ? "white" : "#ABABAB"} />
            </span>
            <Typography
              className={`text-form-text ${
                isSelected ? "font-bold text-white" : ""
              }`}
              sx={{
                fontWeight: isSelected ? "semibold" : "normal",
                fontSize: "18px",
                lineHeight: "23.4px",
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
