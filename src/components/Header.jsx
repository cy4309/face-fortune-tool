import BaseButton from "@/components/BaseButton";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "@/stores/features/styleSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { SunOutlined } from "@ant-design/icons";
import { CaretLeftOutlined } from "@ant-design/icons";
// import Login from "@/containers/Login";
// import { showSwal } from "@/utils/notification";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isResultsPage = location.pathname === "/results";
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  // const isAuthenticated = localStorage.getItem("userName");

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
    const currentMode = localStorage.getItem("darkMode") === "true";
    localStorage.setItem("darkMode", !currentMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  // const handleAuth = () => {
  //   if (isAuthenticated) {
  //     // dispatch(logout());
  //     showSwal(true, "You have been logged out.");
  //     setIsLoginOpen(false);
  //     localStorage.removeItem("userName");
  //     navigate("/");
  //   } else {
  //     setIsLoginOpen(true);
  //   }
  // };

  return (
    <nav className="container p-4 z-10 flex justify-between items-center">
      <div>
        {(isHomePage || isResultsPage) && (
          <BaseButton
            className="flex justify-center items-center cursor-pointer"
            onClick={() => handleLogout()}
          >
            <CaretLeftOutlined /> 回主頁，並儲存進度
          </BaseButton>
        )}
      </div>
      {/* <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/s.png" alt="Spe3d" className="h-6 mr-2" />
        <h1>Face Fortune Tool</h1>
      </div> */}
      <div className="flex justify-center items-center">
        <p className="text-sm mr-4 flex items-center">V0.1.1</p>
        <BaseButton
          className="h-10 cursor-pointer hover:bg-hoverGray"
          // onClick={() => dispatch(toggleDarkMode())}
          onClick={handleToggleDarkMode}
        >
          <SunOutlined />
        </BaseButton>
        {/* <BaseButton
          label={isAuthenticated ? "Log Out" : "Log In"}
          onClick={handleAuth}
          // className={`text-white bg-primaryGray hover:bg-black dark:bg-white dark:text-primaryGray`}
          className={`${
            isAuthenticated
              ? "hover:bg-hoverGray dark:bg-primaryGray dark:text-white hover:dark:bg-hoverGray"
              : "bg-primaryGray text-white hover:bg-hoverGray dark:bg-white dark:text-primaryGray hover:dark:bg-hoverGray"
          }`}
        /> */}
      </div>

      {/* <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </nav>
  );
};

export default Nav;
