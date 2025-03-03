import { useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { router_path } from "@/routers";
import LoadingIndicator from "@/components/LoadingIndicator";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/app.css";
import { ConfigProvider, theme } from "antd";

// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   // const isAuthenticated = useSelector(
//   //   (state: RootState) => state.auth.isAuthenticated
//   // );
//   const isAuthenticated = localStorage.getItem("userName");
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(router_path.index);
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated ? children : null;
// };

const Home = lazy(() => import("@/pages/Home"));
const Error = lazy(() => import("@/pages/Error"));

const App = () => {
  const isDarkMode = useSelector((state) => state.style.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme[isDarkMode ? "darkAlgorithm" : "defaultAlgorithm"], //antd 5.0.0的寫法，而不是4.0.0的mode:"dark"寫法
        }}
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path={router_path.index}
              element={
                <Suspense fallback={<LoadingIndicator />}>
                  <Home />
                </Suspense>
              }
            />
            <Route path={router_path.error} element={<Error />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
