import { logoutUser } from "./apis/auth";
import { Navigate } from "react-router-dom";

const Logout = () => {
  logoutUser();

  return <Navigate to="/" />;
};

export default Logout;
