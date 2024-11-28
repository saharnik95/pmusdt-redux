import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLeftSide from "@/components/organisms/UserLeftSide";
import UserDashboard from "@/components/molecules/user/UserDashboard";
import UserProfile from "@/components/molecules/user/UserProfile";
import UserPartner from "@/components/molecules/user/UserPartner";
import { RootState, AppDispatch } from "@/store/store";
import { setCurrentPage } from "@/store/userSlice";
import { logout } from "@/store/authSlice";

export default function User() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentPage = useSelector((state: RootState) => state.user.currentPage);

  useEffect(() => {
    if (currentPage === "Exit") {
      dispatch(logout());
      navigate("/login");
    }
  }, [currentPage, dispatch, navigate]);

  const renderRightSide = () => {
    switch (currentPage) {
      case "Dashboard":
        return <UserDashboard />;
      case "Profile":
        return <UserProfile />;
      case "Partner Program":
        return <UserPartner />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col lg:gap-x-5 md:gap-x-2 gap-y-3 max-w-[1140px] xl:px-0 xl:mx-auto lg:mb-12 md:px-8 md:pb-16 px-4 pb-12 ">
      <div className="flex flex-col ">
        <UserLeftSide
          setCurrentPage={(page: string) => dispatch(setCurrentPage(page))}
          currentPage={currentPage}
        />
      </div>

      <div className="flex flex-col w-full">{renderRightSide()}</div>
    </div>
  );
}
