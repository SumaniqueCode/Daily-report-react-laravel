import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { isLoggedIn, login } from "./apis/auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { loginData } from "../../interface/auth";
import { checkWorkSpaceExist } from "./../Onboarding/api/api";
import LoginGoogle from "./LoginGoogle";
import Loader from "./../global/Loader";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://daily-report.com/">
        Daily Report
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Login = () => {
  const navigate = useNavigate();

  const [loading, setIsLoading] = useState<boolean>(false);

  const [fetching, setIsFetching] = useState<boolean>(false);

  const initialValues: loginData = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required field"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        const res = await login(data);
        localStorage.setItem("email", res.data.user.email);
        navigate("/dashboard");
      } catch (error: any) {
        setIsLoading(false);
        formik.resetForm();
        toast.error(error.response.data.errors[0]);
      }
    },
  });

  const { errors, getFieldProps, touched } = formik;

  useEffect(() => {
    try {
      const checkValidityFunction = async () => {
        setIsFetching(true);
        const checkIfValid = await isLoggedIn();
        const checkIfWorkSpaceExist = await checkWorkSpaceExist();
        if (checkIfValid) {
          if (!checkIfWorkSpaceExist) {
            navigate("/onboarding");
          } else {
            navigate("/dashboard");
          }
        }
        setIsFetching(false);
      };

      checkValidityFunction();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {fetching ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...getFieldProps("email")}
                color="primary"
                size="small"
              />
              {errors.email && touched.email && (
                <span color="textSecondary" style={{ color: "red" }}>
                  {errors.email}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...getFieldProps("password")}
                autoComplete="current-password"
                size="small"
              />

              {errors.password && touched.password && (
                <span color="textSecondary" style={{ color: "red" }}>
                  {errors.password}
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "primary",
                  borderRadius: "25px",
                  textTransform: "none",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/forgot"
                    variant="body2"
                    sx={{ color: "black", textDecoration: "none" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{ color: "black", textDecoration: "none" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <div style={{ marginTop: "30px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="416"
                height="40"
                viewBox="0 0 416 2"
                fill="none"
              >
                <path
                  d="M0 1.5L188.154 1.27385M223.207 1.23172L416 1"
                  stroke="black"
                />
                <text
                  x="50%"
                  y="50%"
                  dy=".3em"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  or
                </text>
              </svg>
            </div>

            {/* // google login button */}
            <LoginGoogle />
          </Box>
          <Copyright sx={{ mt: 5, mb: 4 }} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Container>
      )}
    </>
  );
};

export default Login;
