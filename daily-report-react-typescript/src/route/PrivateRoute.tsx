import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../auth/apis/auth";
import { useState, useEffect, ReactNode } from "react";
import { checkWorkSpaceExist } from "../Onboarding/api/api";
import Loader from "../global/Loader";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkValidityFunction = async () => {
      try {
        const checkIfValid = await isLoggedIn();
        const checkIfExist = await checkWorkSpaceExist();

        if (checkIfValid) {
          if (checkIfExist) {
            setIsLoading(false);
          } else navigate("/onboarding");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkValidityFunction();
  }, [navigate]);

  return <>{loading ? <Loader /> : children}</>;
};

export default PrivateRoute;
