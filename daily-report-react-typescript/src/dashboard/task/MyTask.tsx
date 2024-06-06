import { Box } from "@mui/system";
import SearchBar from "../common/SearchBar/SearchBar";
import Sort from "../common/SearchBar/Sort";
import View from "../common/SearchBar/View";
import { TaskData } from "../../../interface/task";
import { Button, Modal, } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../global/Loader";
import { PriorityOptions, StatusOptions } from "../common/GlobalData/PSoptions";
import { ToastContainer } from "react-toastify";
import AddTask from "../project/projectDetail/task/components/AddTask";
import TaskListView from "../project/projectDetail/task/List/TaskListView";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTask } from "../../redux/slices/taskSlice";

const MyTask = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddTaskModal, setIsAddTaskModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const getAllTasks = async () => {
    await dispatch(fetchTask());
    setLoading(false);
  }
  const allTasks: TaskData[] = useAppSelector(
    (state) => state.tasks.taskList
  );

  const user_id = parseInt(localStorage.getItem("AuthUserId") ?? "", 10) || null;
  
  const userTasks = allTasks.filter((task)=>task.assigned_team.some((assignedUser) => assignedUser.id === user_id));

  const handleAddTaskModalClose = () => {
    setIsAddTaskModal(false);
  }
  const openAddTaskModal = () =>{
    setIsAddTaskModal(true);
  }

  useEffect(() => {
    getAllTasks();
  }, [])

  const filteredTasks = userTasks.filter((task) => {
    const statusLabel = StatusOptions.find((status) => status.value == task.status)?.label;
    const priorityLabel = PriorityOptions.find((priority) => priority.value == task.priority)?.label;
    const valuesToCheck = [
      task.name,
      task.description,
      statusLabel,
      priorityLabel,
    ];
    return valuesToCheck.some((value) => value?.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <>
      <Box sx={{ mx: 5, p: 1, }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, }}>
          <Box sx={{ flexGrow: 1, pl: 2 }}>
            <SearchBar placeholder="Tasks" onChange={(teamName) => setSearchQuery(teamName)} />
          </Box>
          <Sort />
          <View />
          <Button onClick={openAddTaskModal} variant="contained" sx={{ px: 3.8, borderRadius: "5px", boxShadow: 3 }}>
            Add Task
          </Button>
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <Box sx={{ mx: 2, }}>
            <TaskListView tasks={filteredTasks} />
            <Modal open={isAddTaskModal} onClose={handleAddTaskModalClose}>
              <AddTask projectId={1} handleAddTaskModalClose={handleAddTaskModalClose} />
            </Modal>
          </Box>
        )}
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
};

export default MyTask;
