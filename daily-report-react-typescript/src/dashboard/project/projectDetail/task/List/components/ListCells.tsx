import { Avatar, AvatarGroup, MenuItem, Modal, Select, TableCell, Typography } from "@mui/material"
import { EditTaskData, TaskData, TaskTeamData } from "../../../../../../../interface/task"
import { formatDistanceToNow } from "date-fns";
import { PriorityOptions, StatusOptions } from "../../../../../common/GlobalData/PSoptions";
import UserIcon from "../../../../../../../public/assets/User_Icon.png";
import DottedBtn from "./DottedBtn";
import { useState } from "react";
import DescriptionModel from "../../../../../common/CardComponents/DescriptionModel";
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector, } from "../../../../../../redux/hooks";
import { useFormik } from "formik";
import { editOneTask, fetchTask } from "../../../../../../redux/slices/taskSlice";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TeamData } from "../../../../../../../interface/team";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TaskArrayProps {
    task: TaskData,
}

const ListCells = ({ task }: TaskArrayProps) => {
    const [isDottenBtn, setDottedBtn] = useState<boolean>(false);
    const [isDescriptionModal, setDescriptionModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const closeDescriptionModel = () => {
        setDescriptionModal(false);
    }

    const initialValues: EditTaskData = {
        id: task.id,
        name: task.name,
        description: task.description || "",
        start_date: task.start_date || "",
        due_date: task.due_date || "",
        status: task.status,
        priority: task.priority,
        assigned_team: task.assigned_team.map((team: TaskTeamData) => team.id),
    }

    const handleAssignedTeamChange = (user_id: number) => {
        const userIndex = task.assigned_team.findIndex((team: TaskTeamData) => team.id === user_id);
        if (userIndex !== -1) {
            const updatedAssignedTeam = [...task.assigned_team.slice(0, userIndex), ...task.assigned_team.slice(userIndex + 1)];
            formik.handleChange({ target: { name: 'assigned_team', value: updatedAssignedTeam } });
            formik.handleSubmit();
        } else {
            const updatedAssignedTeam = [...task.assigned_team, user_id];
            formik.handleChange({ target: { name: 'assigned_team', value: updatedAssignedTeam } });
            formik.handleSubmit();
        }
    };


    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const response = await dispatch(editOneTask(values));
                await dispatch(fetchTask());
                if (response.meta.requestStatus === 'fulfilled') {
                    toast.success("Task Edited successfully");
                }
                if ('error' in response) {
                    toast.error(response.error.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    const teams: TeamData[] = useAppSelector(
        (state) => state.teams.teamList
    );
    const users = teams.filter((team) => team.status === "Active")
        .map((team) => team.user)

    const { getFieldProps } = formik;

    return (
        <>
            <TableCell width="8%" sx={{ '&:hover': { cursor: 'pointer' }, }} onMouseEnter={() => setDottedBtn(true)} onMouseLeave={() => setDottedBtn(false)}>
                {isDottenBtn ? (
                    <DottedBtn setDottedBtn={setDottedBtn} task={task} />
                ) : (
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#424242', "&:hover": { color: 'purple', }, cursor: 'pointer' }}>
                        {task.name && task.name.length > 10 ? `${task.name.substring(0, 7)}...` : task.name}
                    </Typography>
                )}
            </TableCell>
            <TableCell sx={{ transition: "background-color 0.2s", }} onClick={() => setDescriptionModal(true)}>
                <Typography variant="subtitle2" sx={{ color: '#424242' }}>
                    {task.description && task.description.length > 30 ? `${task.description.substring(0, 20)}...` : task.description}
                </Typography>
            </TableCell>
            <TableCell>
                <Select required fullWidth variant="standard" {...getFieldProps("status")} size="small" >
                    {StatusOptions.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                            <Typography onClick={() => formik.handleSubmit()} sx={{ color: `${status.value == 1 ? 'red' : status.value == 2 ? 'orange' : status.value == 3 ? 'blue' : 'green'}` }} variant="subtitle2">
                                {status.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell>
                <Select required fullWidth variant="standard" {...getFieldProps("priority")} size="small" >
                    {PriorityOptions.map((priority) => (
                        <MenuItem key={priority.value} value={priority.value}>
                            <Typography onClick={() => formik.handleSubmit()} sx={{ color: `${priority.value == 1 ? 'red' : priority.value == 2 ? 'blue' : 'green'}` }} variant="subtitle2">
                                {priority.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell sx={{ display: "flex", justifyContent: 'space-between' }}>
                <AvatarGroup>
                    {task.assigned_team.map((team) => (
                        <Avatar sx={{ height: 30, width: 30, marginRight: "2px" }} title={team.display_name}
                            src={
                                team.profile_picture !== null
                                    ? `${team.profile_picture}`
                                    : `${UserIcon}`
                            } />
                    ))}
                </AvatarGroup>
                <Select variant="standard" sx={{ width: 25 }}>
                    {users.map((user) => (
                        <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}
                            onClick={() => handleAssignedTeamChange(user.id)}>
                            {user.display_name}
                             {task.assigned_team.some(team => team.id === user.id) &&
                                <CheckCircleIcon sx={{ fontSize: 'medium', color:'green', marginLeft: 'auto', mx:1, }} />
                            } 
                        </MenuItem>
                    ))}
                </Select>

            </TableCell>
            <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                        <DatePicker format="YYYY-MM-DD" slotProps={{ textField: { variant: 'standard', } }} sx={{ "& .MuiInputBase-root": { height: 33, width: 3 / 5, fontSize: 13, }, }} value={dayjs(initialValues.due_date)} onChange={(newDate: any) => { formik.setFieldValue("start_date", dayjs(newDate).format("YYYY-MM-DD")); formik.handleSubmit(); }} />
                    </DemoItem>
                </LocalizationProvider>
            </TableCell>
            <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                        <DatePicker format="YYYY-MM-DD" slotProps={{ textField: { variant: 'standard', } }} sx={{ "& .MuiInputBase-root": { height: 33, width: 3 / 5, fontSize: 13, }, }} value={dayjs(initialValues.due_date)} onChange={(newDate: any) => { formik.setFieldValue("due_date", dayjs(newDate).format("YYYY-MM-DD")); formik.handleSubmit(); }} />
                    </DemoItem>
                </LocalizationProvider>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle2" sx={{ color: '#424242' }}>
                    {format(new Date(task.created_at), 'yyyy-M-d')}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle2" sx={{ display: 'inline', }} >
                    {formatDistanceToNow(new Date(task.updated_at), {
                        addSuffix: true,
                    })}
                </Typography>
            </TableCell>
            <Modal open={isDescriptionModal} onClose={setDescriptionModal}>
                <DescriptionModel closeDescriptionModel={closeDescriptionModel} title={task.name} description={task?.description} />
            </Modal>
        </>
    )
}

export default ListCells