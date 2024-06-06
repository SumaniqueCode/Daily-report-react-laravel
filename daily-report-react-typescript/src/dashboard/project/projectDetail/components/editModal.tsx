import { useEffect, useState } from "react";
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {
  getModuleData,
  editModuleData,
  moduleTeams,
} from "../../../../../interface/project";
import CircularProgress from "@mui/material/CircularProgress";
import { Autocomplete } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  editOneModule,
  fetchModules,
} from "../../../../redux/slices/moduleSlice";
import { getOneProject } from "../../../apis/project/projectapi";
import { StatusOptions } from "../../../common/GlobalData/PSoptions";

interface AddModalProps {
  onclose: () => void;
  module: getModuleData;
}

const EditModal = ({ onclose, module }: AddModalProps) => {
  const [loading, setIsloading] = useState<boolean>(false);
  const [teams, setTeams] = useState<moduleTeams[]>([]);
  const teamIds: number[] = module.assigned_team.map((team) => team.id);
  const leadIds: number[] = module.lead.map((team) => team.id);

  const projectId = module.project_id + "";
  const dispatch = useAppDispatch();

  console.log(module);

  const initialValues: editModuleData = {
    id: module.id,
    name: module.name,
    description: module.description,
    status: module.status,
    start_date: dayjs(module.start_date).format("YYYY-MM-DD") || "",
    end_date: dayjs(module.end_date).format("YYYY-MM-DD") || "",
    project_id: module.project_id,
    assigned_team: teamIds || [],
    lead: leadIds || [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required field"),
    description: Yup.string().required("Description is required field"),
    status: Yup.number(),
    start_date: Yup.date(),
    end_date: Yup.date(),
    assigned_team: Yup.array(),
    lead: Yup.array(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      try {
        console.log("Edited: ", data);
        setIsloading(true);
        await dispatch(editOneModule(data));
        await dispatch(fetchModules(projectId));
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


  useEffect(() => {
    try {
      const getAssignedTeams = async () => {
        try {
          if (projectId !== undefined) {
            const response = await getOneProject(projectId);
            console.log(response?.data.project.assigned_team);
            setTeams(response?.data.project.assigned_team);
          }
        } catch (error) {
          console.log(error);
        } finally {
          // setTeamLoading(false);
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
            height: "90vh",
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
            Edit Module
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
                  value={dayjs(initialValues.start_date)}
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
                  value={dayjs(initialValues.end_date)}
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
                    console.log("Date: ", dayjs(newDate).format("YYYY-MM-DD"));
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
              options={teams.filter((team) => !teamIds.includes(team.id))}
              getOptionLabel={(option) => option.display_name}
              defaultValue={[...module.assigned_team]}
              onChange={(_, newValue) => {
                formik.setFieldValue(
                  "assigned_team",
                  newValue.map((user) => user.id)
                );
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
              id="lead"
              options={teams.filter((team) => !leadIds.includes(team.id))}
              getOptionLabel={(option) => option.display_name}
              defaultValue={[...module.lead]}
              onChange={(_, newValue) => {
                formik.setFieldValue(
                  "lead",
                  newValue.map((user) => user.id)
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant="standard"
                    {...getFieldProps("lead")}
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
                "Edit Module"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditModal;
