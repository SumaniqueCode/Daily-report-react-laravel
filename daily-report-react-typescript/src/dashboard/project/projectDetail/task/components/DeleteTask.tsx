import { Box, Card, Typography, } from "@mui/material";
import { TaskData } from "../../../../../../interface/task";
import { useAppDispatch } from "../../../../../redux/hooks";
import { deleteOneTask } from "../../../../../redux/slices/taskSlice";
import { toast } from "react-toastify";

interface TaskArray{
  task:TaskData,
  handleModalClose: ()=>void,
}
const DeleteTask = ( {task, handleModalClose}:TaskArray) => {
  const dispatch = useAppDispatch();
  const removeTaskData = async () => {
    try {
      await dispatch(deleteOneTask(task.id));
      toast.success("Task Deleted successfully");
      handleModalClose();
    } catch (error) {
      console.error("Unexpected API response");
    }
  };

  return (
    <>
        <Card sx={{width: 2 / 8, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, boxShadow: 3 }}>
          <Typography sx={{mx:3, fontWeight: 'bold'}} variant="subtitle1"> Remove task from module?</Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mt: 2, mx: 1, p: 1, px:6, cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0", }, }} onClick={() => removeTaskData()}>
              Yes
            </Typography>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mt: 2, p: 1, mx:1, px:6, cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0", }, }} onClick={() => handleModalClose()}>
              No
            </Typography>
          </Box>
        </Card>
    </>
  );
};

export default DeleteTask;
