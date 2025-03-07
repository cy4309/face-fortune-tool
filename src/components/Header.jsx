import BaseButton from "@/components/BaseButton";
// import { useDispatch } from "react-redux";
// import { toggleDarkMode } from "@/stores/features/styleSlice";
import { useNavigate } from "react-router-dom";
// import { SunOutlined } from "@ant-design/icons";
import { CaretLeftOutlined } from "@ant-design/icons";
// import Login from "@/containers/Login";
// import { showSwal } from "@/utils/notification";

const Nav = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  // const isAuthenticated = localStorage.getItem("userName");

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
    <nav className="container p-4 flex justify-between items-center">
      <BaseButton
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <CaretLeftOutlined /> 回上頁
      </BaseButton>
      {/* <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/s.png" alt="Spe3d" className="h-6 mr-2" />
        <h1>Face Fortune Tool</h1>
      </div> */}
      {/* <div className="flex justify-center items-center">
        <p className="text-sm mr-4 flex items-center">V0.0.1</p>
        <BaseButton
          className="hover:bg-hoverGray"
          onClick={() => dispatch(toggleDarkMode())}
        >
          <SunOutlined />
        </BaseButton>
        <BaseButton
          label={isAuthenticated ? "Log Out" : "Log In"}
          onClick={handleAuth}
          // className={`text-white bg-primaryGray hover:bg-black dark:bg-white dark:text-primaryGray`}
          className={`${
            isAuthenticated
              ? "hover:bg-hoverGray dark:bg-primaryGray dark:text-white hover:dark:bg-hoverGray"
              : "bg-primaryGray text-white hover:bg-hoverGray dark:bg-white dark:text-primaryGray hover:dark:bg-hoverGray"
          }`}
        />
      </div> */}

      {/* <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </nav>
  );
};

export default Nav;
