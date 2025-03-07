import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white text-primary dark:bg-primary dark:text-white">
      {!isHomePage && <Header />}
      <main className="w-full flex-grow flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
