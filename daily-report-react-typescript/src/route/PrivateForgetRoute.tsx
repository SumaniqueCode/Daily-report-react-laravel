import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateForgetRouteProps {
  children: ReactNode;
}

const PrivateForgetRoute = ({ children }: PrivateForgetRouteProps) => {
  const email: string | null = localStorage.getItem("email");

  return email ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateForgetRoute;
