import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../global/Loader";

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const token = queryParameters.get("token");
    const workspace_id = queryParameters.get("workspace_id");
    const user_id = queryParameters.get("user");
    if (!token) {
      navigate("/");
    } else {
      localStorage.setItem("token", token);
      if (workspace_id !== null) {
        localStorage.setItem("workspace_id", workspace_id);
        localStorage.setItem("AuthUserId", user_id || "");
      }
      navigate("/onboarding");
    }
  }, []);

  return <Loader />;
};

export default GoogleLoginPage;
