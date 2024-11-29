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
import QueryProvider from "@/services/QueryProvider";

export default function User() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentPage = useSelector((state: RootState) => state.user.currentPage); //reading current page state from redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated //reading authentication  state from redux
  );
  //every time user mounts check if is not authenticated navigate to log in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  //if the chosen page is exit calls logout and navigate to login if is not goes to selected page

  const handlePageChange = (page: string) => {
    if (page === "Exit") {
      dispatch(logout());
      navigate("/login");
    } else {
      dispatch(setCurrentPage(page));
    }
  };

  const renderRightSide = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <QueryProvider>
            <UserDashboard />{" "}
          </QueryProvider>
        );
      case "Profile":
        return <UserProfile />;
      case "Partner Program":
        return (
          <QueryProvider>
            <UserPartner />
          </QueryProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col lg:gap-x-5 md:gap-x-2 gap-y-3 max-w-[1140px] xl:px-0 xl:mx-auto lg:mb-12 md:px-8 md:pb-16 px-4 pb-12 ">
      <div className="flex flex-col ">
        <UserLeftSide
          setCurrentPage={handlePageChange}
          currentPage={currentPage}
        />
      </div>

      <div className="flex flex-col w-full">{renderRightSide()}</div>
    </div>
  );
}
