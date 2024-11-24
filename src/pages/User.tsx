import UserLeftSide from "@/components/organisms/UserLeftSide";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import UserDashboard from "@/components/molecules/user/UserDashboard";
import UserProfile from "@/components/molecules/user/UserProfile";
import UserPartner from "@/components/molecules/user/UserPartner";

export default function User() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Render right side based on currentPage
  const renderRightSide = () => {
    switch (currentPage) {
      case "Dashboard":
        return <UserDashboard />;
      case "Profile":
        return <UserProfile />;
      case "Partner Program":
        return <UserPartner />;
      default:
        return null; // Handle any unknown page
    }
  };

  return (
    <div className="w-full flex  lg:gap-x-5 max-w-[1140px] xl:px-0 xl:mx-auto lg:mb-12 md:mb-16 mb-8 ">
      <div className="flex flex-col">
        {/* Pass `currentPage` as a prop */}
        <UserLeftSide
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <div className="flex flex-col">
        {currentPage === "Exit"
          ? (() => {
              logout();
              navigate("/login");
              return null; // Return `null` to render nothing after logout
            })()
          : renderRightSide()}
      </div>
    </div>
  );
}
