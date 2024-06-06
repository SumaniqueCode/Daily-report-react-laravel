import { useState } from "react";
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
import { editProjectData } from "./../../../../interface/project";
import CircularProgress from "@mui/material/CircularProgress";
import { editProject, fetchProjects } from "../../../redux/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Autocomplete } from "@mui/material";
import { ProjectData } from "./../../../../interface/project";
import { PriorityOptions, StatusOptions } from "../../common/GlobalData/PSoptions";
import { TeamData } from "../../../../interface/team";

interface AddModalProps {
  onclose: () => void;
  project: ProjectData;
}

const EditModal: React.FC<AddModalProps> = ({ onclose, project }) => {
  const [loading, setIsloading] = useState<boolean>(false);
  const teamIds: number[] = project.assigned_team.map((team) => team.id);
  const dispatch = useAppDispatch();

  const initialValues: editProjectData = {
    name: project.name,
    description: project.description,
    status: project.status,
    priority: project.priority,
    assigned_team: teamIds || [],
    id: project.id,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required field"),
    description: Yup.string().required("Description is required field"),
    status: Yup.string().required("Status is required field"),
    priority: Yup.string().required("Priority is required field"),
    assigned_team: Yup.array().required("Please assign a team"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        setIsloading(true);
        await dispatch(editProject(data));
        await dispatch(fetchProjects());
        toast.success("Project Edited successfully");
        formik.resetForm();
        setIsloading(false);
        onclose();
      } catch (error) {
        setIsloading(false);
        console.log(error);
        formik.resetForm();
      }
    },
  });

  const teams: TeamData[] = useAppSelector(
    (state) => state.teams.teamList
  );
  const users = teams.filter((team)=>team.status ==="Active")
  .map((team)=>team.user)

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
            Edit Project
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
              Project Name
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
              Project Description
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
              Project Status
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
              }}
            >
              Project Priority
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              {...getFieldProps("priority")}
              type="text"
              id="Size"
              size="small"
              sx={{ marginTop: "5px" }}
            >
              {PriorityOptions.map((priority) => (
                <MenuItem key={priority.value} value={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.priority && touched.priority && (
              <span color="textSecondary" style={{ color: "red" }}>
                {errors.priority}
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
              Assign Team
            </Typography>
            <Autocomplete
              multiple
              id="assigned_team"
              options={users.filter(user => !project.assigned_team.some(defaultUser => defaultUser.id === user.id))}
              getOptionLabel={(option) => option.display_name}
              defaultValue={[...project.assigned_team]}
              onChange={(_, newValue) => {
                formik.setFieldValue("assigned_team", newValue.map((user) => user.id));
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant="standard"
                    {...getFieldProps("assigned_team")}
                  />
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
                "Edit Project"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditModal;
