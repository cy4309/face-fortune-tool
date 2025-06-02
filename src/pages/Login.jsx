import BaseButton from "@/components/BaseButton";
import { useNavigate } from "react-router-dom";
import { showSwal } from "@/utils/notification";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (userName) => {
    localStorage.setItem("userName", userName);
    showSwal({ isSuccess: true, title: `Welcome, ${userName}!` });
    navigate("/");
  };

  return (
    <>
      <div className="space-y-4 p-4 w-full min-h-[80vh] flex flex-col justify-center items-center">
        <BaseButton
          className="w-full"
          onClick={() => handleLogin("YoungChien")}
        >
          簡少年登入
        </BaseButton>
        <BaseButton className="w-full" onClick={() => handleLogin("Admin")}>
          後台登入
        </BaseButton>
      </div>
    </>
  );
};

export default Login;
