import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { checkWorkSpaceExist, createWorkSpace } from "./api/api";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../auth/apis/auth";
import {
  CreateWorkSpaceData,
  OrgSizeOption,
} from "./../../interface/onboarding";
import { toast } from "react-toastify";

const OrgSize: OrgSizeOption[] = [
  {
    value: "0-10",
    label: "0-10",
  },
  {
    value: "10-100",
    label: "10-100",
  },
  {
    value: "100-1000",
    label: "100-1000",
  },
  {
    value: "1000-above",
    label: "1000-above",
  },
];

const OnBoarding = () => {
  const navigate = useNavigate();

  const [loading, setIsLoading] = useState<boolean>(false);

  const initialValues: CreateWorkSpaceData = {
    name: "",
    size: "",
    logo: new File([], "sample.jpg"),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required field"),
    size: Yup.string().required("Size is required field"),
    logo: Yup.mixed(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsLoading(true);
        await createWorkSpace(data);
        setIsLoading(false);
        toast.success("Workspace Created Successfully");
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    const checkValidityFunction = async () => {
      const checkIfValid = await isLoggedIn();
      const checkIfWorkSpaceExist = await checkWorkSpaceExist();
      if (checkIfValid) {
        if (!checkIfWorkSpaceExist) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    };

    checkValidityFunction();
  }, []);

  const { errors, getFieldProps, touched } = formik;

  return (
    <>
      <Container component="main" sx={{ display: 'relative', justifyContent: "space-between", bgcolor: "white", borderRadius:2}} >
        <Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: "40px", borderColor: "rgba(0, 0, 0, 0.3)" }} />
        <Box sx={{ display: 'flex', marginTop:3, marginBottom:5 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600, }} >
            Create your workspace
          </Typography>
          <Typography sx={{ marginLeft: 'auto' }} >
            {localStorage.getItem("email")}
          </Typography>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: "12.6px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "18.9px",
            }}
          >
            Workspace Name
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enter workspace name"
            {...getFieldProps("name")}
            color="primary"
            size="small"
          />
          {errors.name && touched.name && (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.name}
            </span>
          )}
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: "12.6px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "18.9px",
              marginTop: "24.2px",
            }}
          >
            Workspace logo
          </Typography>
          <input
            id="logo"
            type="file"
            onChange={(e) => {
              const files = e.currentTarget.files;
              if (files && files.length > 0) {
                const file = files[0];
                formik.setFieldValue("logo", file);
              }
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: "12.6px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "18.9px",
              marginTop: "24.2px",
            }}
          >
            What size is your organization?
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            defaultValue="0-10"
            label="Select organization size"
            type="number"
            id="Size"
            {...getFieldProps("size")}
            size="small"
          >
            {OrgSize.map((size) => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.size && touched.size && (
            <span color="textSecondary" style={{ color: "red" }}>
              {errors.size}
            </span>
          )}
          <div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary",
                borderRadius: "25px",
                width: "25%",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create workspace"
              )}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "white",
                borderRadius: "10px",
                color: "black",
                marginLeft: "5%",
                "&:hover": {
                  bgcolor: "white", // Change the color on hover
                },
              }}
            >
              Go back
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default OnBoarding;
