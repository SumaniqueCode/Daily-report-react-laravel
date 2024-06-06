import { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Typography, Card, MenuItem, Autocomplete, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditTaskData, TaskData, TaskTeamData } from '../../../../../../interface/task';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TeamData } from '../../../../../../interface/team';
import { PriorityOptions, StatusOptions } from '../../../../common/GlobalData/PSoptions';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { editOneTask, fetchTask } from '../../../../../redux/slices/taskSlice';
import { toast } from 'react-toastify';

interface TaskArrayProps{
    task: TaskData,
    handleModalClose: ()=>void,
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const EditTask = ({ task, handleModalClose }: TaskArrayProps) => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const initialValues: EditTaskData = {
        id: task.id,
        name: task.name,
        description: task.description || "",
        start_date: task.start_date || "",
        due_date: task.due_date || "",
        status: task.status,
        priority: task.priority,
        assigned_team: task.assigned_team.map((team:TaskTeamData) => team.id),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await dispatch(editOneTask(values));
                await dispatch(fetchTask());
                if (response.meta.requestStatus === 'fulfilled') {
                    toast.success("Task Edited successfully");
                    handleModalClose();
                }
                if ('error' in response) {
                    toast.error(response.error.message);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        },
    });

    const teams: TeamData[] = useAppSelector(
        (state) => state.teams.teamList
    );
    const users = teams.filter((team) => team.status === "Active")
        .map((team) => team.user)

    const { errors, getFieldProps, touched } = formik;

    return (
        <Card sx={{ width: 1 / 3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, boxShadow: 3, }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: 'relative', zIndex: 1 }}>
                <Typography component="h1" variant="h5" sx={{ alignSelf: 'flex-start' }}>
                    Edit Task Details
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: 1, }}>
                    <TextField size='small' label="Name" {...getFieldProps("name")} helperText={formik.touched.name && formik.errors.name} margin="normal" required fullWidth />
                    <TextField multiline rows={3} sx={{ marginBottom: 2 }} size='small' label="Description" {...getFieldProps("description")} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} margin="normal" required fullWidth />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                            <DatePicker label={"Start Date"} format="YYYY-MM-DD" sx={{ "& .MuiInputBase-root": { height: 45, }, }} value={dayjs(initialValues.start_date)} onChange={(newDate: any) => { formik.setFieldValue("start_date", dayjs(newDate).format("YYYY-MM-DD")); }} />
                        </DemoItem>
                    </LocalizationProvider>
                    <Box sx={{ my: 2 }}></Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                            <DatePicker label={"Due Date"} format="YYYY-MM-DD" sx={{ "& .MuiInputBase-root": { height: 45, }, }} value={dayjs(initialValues.due_date)} onChange={(newDate: any) => { formik.setFieldValue("due_date", dayjs(newDate).format("YYYY-MM-DD")); }} />
                        </DemoItem>
                    </LocalizationProvider>
                    <TextField margin="normal" required fullWidth select label="Task Status" {...getFieldProps("status")} size="small" >
                        {StatusOptions.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField margin="normal" required fullWidth label="Task Priority" select {...getFieldProps("priority")} size="small" >
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
                    <InputLabel>Asssign Team</InputLabel>
                    <Autocomplete multiple
                        options={users.filter(user => !task.assigned_team.some(defaultUser => defaultUser.id === user.id))}
                        getOptionLabel={(option) => option.display_name}
                        defaultValue={[...task.assigned_team]}
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
                    <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '25px', mt: 3 }}>
                        {loading ? (<CircularProgress sx={{ mx:4.7}} size={24} color="inherit" />) : ('Update Task')}
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default EditTask;
