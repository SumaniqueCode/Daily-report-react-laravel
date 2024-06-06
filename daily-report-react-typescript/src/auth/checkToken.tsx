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
import { checkToken } from "./apis/auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { tokenData } from "../../interface/auth";

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

const CheckResetToken = () => {
  const navigate = useNavigate();

  const [loading, setIsLoading] = useState<boolean>(false);

  const initialValues: tokenData = {
    email: localStorage.getItem("email") || "",
    token: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required field"),
    token: Yup.string().required("Token is required field"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        await checkToken(data);
        setIsLoading(false);
        navigate("/changePassword");
      } catch (error: any) {
        setIsLoading(false);
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
          Token
        </Typography>
        <Typography component="h6" variant="h6">
          Check your email for token
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
            InputProps={{
              readOnly: true,
            }}
          />
          {errors.email && touched.email ? (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.email}
            </span>
          ) : (
            <></>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="token"
            label="Token"
            autoComplete="email"
            autoFocus
            {...getFieldProps("token")}
            type="text"
            color="primary"
          />
          {errors.token && touched.token ? (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.token}
            </span>
          ) : (
            <></>
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
              "Verify Token"
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

export default CheckResetToken;
