import BaseButton from "@/components/BaseButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
        <BaseButton className="w-2/3" onClick={() => navigate("/")}>
          簡少年登入
        </BaseButton>
        <BaseButton className="w-2/3" onClick={() => navigate("/")}>
          後台登入
        </BaseButton>
      </div>
    </>
  );
};

export default Login;
