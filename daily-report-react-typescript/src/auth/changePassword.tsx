import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { changePasswordData } from "../../interface/auth";
import { changePassword } from "./apis/auth";

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
const ChangePassword = () => {
  const navigate = useNavigate();

  const [loading, setIsLoading] = useState<boolean>(false);

  const initialValues: changePasswordData = {
    email: localStorage.getItem("email") || "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required field"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    password_confirmation: Yup.string()
      .required("Please confirm your password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        await changePassword(data);
        setIsLoading(false);
        localStorage.removeItem("email");
        navigate("/");
      } catch (error: any) {
        setIsLoading(false);
        console.log(error);
        formik.resetForm();
        toast.error(error.response.data.errors[0]);
      }
    },
  });

  const { errors, getFieldProps, touched } = formik;

  return (
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
          Change Password
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
            InputProps={{
              readOnly: true,
            }}
            color="primary"
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
          />
          {errors.password && touched.password && (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.password}
            </span>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...getFieldProps("password_confirmation")}
            autoComplete="current-password"
          />
          {errors.password_confirmation && touched.password_confirmation && (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.password_confirmation}
            </span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "primary", borderRadius: "25px" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Box>
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
  );
};

export default ChangePassword;
