import Button from "@mui/material/Button";
import { googleLogin } from "./apis/auth";
import GoogleIcon from "@mui/icons-material/Google";

const LoginGoogle = () => {
  const login = async () => {
    try {
      const res = await googleLogin();
      window.location.replace(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() => login()}
      sx={{
        mt: 3,
        mb: 2,
        bgcolor: "transparent",
        borderRadius: "10px",
        textTransform: "none",
        fontSize: "15px",
        border: "1px solid lightblue",
      }}
    >
      <GoogleIcon style={{ fill: "#007FFF" }} />
      <div style={{ color: "black", marginLeft: "15px" }}>
        Sign in with Google
      </div>
    </Button>
  );
};

export default LoginGoogle;
