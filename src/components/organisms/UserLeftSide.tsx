import ProfileIconComponent from "../icons/ProfileIconComponent";
import PartnerIconComponent from "../icons/PartnerIconComponent";
import ExitIconComponent from "../icons/ExitIconComponent";
import DashboardIconComponent from "../icons/DashboardIconComponent";

interface MenuItem {
  id: number;
  icon: React.ComponentType;
  name: string;
}
export default function UserLeftSide() {
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
  return <div className="bg-form-background lg:p-8 lg:gap-[38px]"></div>;
}
