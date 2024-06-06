import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Autocomplete } from "@mui/material";
import { useParams } from "react-router-dom";
import { addModuleData } from "./../../../../../interface/project";
import { moduleTeams } from "./../../../../../interface/project";
import { addModule, fetchModules } from "../../../../redux/slices/moduleSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { getOneProject } from "../../../apis/project/projectapi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { StatusOptions } from "../../../common/GlobalData/PSoptions";

interface AddModalProps {
  onclose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onclose }) => {
  const [loading, setIsloading] = useState<boolean>(false);
  const [assignedTeams, setAssignedTeams] = useState<moduleTeams[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const projectId: string | undefined =
    (id ? parseInt(id, 10) : undefined) + "";

  const initialValues: addModuleData = {
    name: "",
    description: "",
    status: 0,
    start_date: "",
    end_date: "",
    project_id: projectId + "",
    assigned_team: [],
    lead: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required field"),
    description: Yup.string().required("Description is required field"),
    status: Yup.number().required("Status is required field"),
    start_date: Yup.date(),
    end_date: Yup.date(),
    project_id: Yup.string().required("Project ID is a required field"),
    assigned_team: Yup.array(),
    lead: Yup.array(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        if (id !== undefined) {
          setIsloading(true);
          console.log("Datsss: ", data);
          await dispatch(addModule(data));
          await dispatch(fetchModules(id));
          toast.success("Project added successfully");
          formik.resetForm();
          setIsloading(false);
          onclose();
        }
      } catch (error) {
        setIsloading(false);
        console.log(error);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    try {
      const getAssignedTeams = async () => {
        try {
          if (projectId !== undefined) {
            const response = await getOneProject(projectId);
            console.log("Fromm moudule", response?.data.project.assigned_team);
            setAssignedTeams(response?.data.project.assigned_team);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setTeamLoading(false);
        }
      };
      getAssignedTeams();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { errors, getFieldProps, touched } = formik;

  return (
    <>
      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "1px solid #fff",
            borderRadius: "5px",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            Add Module
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
              }}
            >
              Module Name
            </Typography>
            <TextField
              required
              fullWidth
              id="name"
              {...getFieldProps("name")}
              color="primary"
              size="small"
              sx={{ marginTop: "5px" }}
            />
            {errors.name && touched.name && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.name}
              </span>
            )}
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              Module Description
            </Typography>
            <TextField
              required
              fullWidth
              id="name"
              color="primary"
              size="small"
              {...getFieldProps("description")}
              multiline
              rows={3}
              sx={{ marginTop: "5px" }}
            />
            {errors.description && touched.description && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.description}
              </span>
            )}
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              Module Status
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              {...getFieldProps("status")}
              type="text"
              id="Size"
              size="small"
              sx={{ marginTop: "5px" }}
            >
              {StatusOptions.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.status && touched.status && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.status}
              </span>
            )}
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  format="YYYY-MM-DD"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 45,
                    },
                  }}
                  onChange={(newDate: any) => {
                    formik.setFieldValue(
                      "start_date",
                      dayjs(newDate).format("YYYY-MM-DD")
                    );
                  }}
                />
              </DemoItem>
            </LocalizationProvider>
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  format="YYYY-MM-DD"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 45, // Adjust the height as needed
                    },
                  }}
                  onChange={(newDate: any) => {
                    formik.setFieldValue(
                      "end_date",
                      dayjs(newDate).format("YYYY-MM-DD")
                    );
                  }}
                />
              </DemoItem>
            </LocalizationProvider>
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              Assign Team
            </Typography>
            <Autocomplete
              multiple
              id="assigned_team"
              options={assignedTeams.flat()}
              getOptionLabel={(option) => option.display_name}
              onChange={(_, newValue) => {
                formik.setFieldValue(
                  "assigned_team",
                  newValue.map((user) => user.id)
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} variant="standard" />
                </>
              )}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: "12.6px",
                fontStyle: "normal",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              Assign Lead
            </Typography>
            <Autocomplete
              multiple
              id="assigned_team"
              options={assignedTeams.flat()}
              getOptionLabel={(option) => option.display_name}
              loading={teamLoading}
              onChange={(_, newValue) => {
                formik.setFieldValue(
                  "lead",
                  newValue.map((user) => user.id)
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} variant="standard" />
                </>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary",
                borderRadius: "25px",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Module"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddModal;
