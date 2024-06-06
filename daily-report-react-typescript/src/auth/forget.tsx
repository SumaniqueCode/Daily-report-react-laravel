import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { forgotPassword } from "./apis/auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { forgotData } from "../../interface/auth";
import Grid from "@mui/material/Grid";

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
const Forget = () => {
  const navigate = useNavigate();

  const [loading, setIsLoading] = useState<boolean>(false);

  const initialValues: forgotData = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        await forgotPassword(data);
        setIsLoading(false);
        localStorage.setItem("email", data.email);
        navigate("/checkResetToken");
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
          Forget Password
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
            sx={{ width: "25.7em" }}
            size="small"
          />

          <FormHelperText error sx={{ fontSize: "1em" }}>
            {errors.email && touched.email && errors.email}
          </FormHelperText>
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
              "Send Email"
            )}
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link
              href="/"
              variant="body2"
              sx={{ color: "black", textDecoration: "none" }}
            >
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
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

export default Forget;
