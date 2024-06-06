import Modal from "@mui/material/Modal";
import SearchBar from "../common/SearchBar/SearchBar";
import Sort from "../common/SearchBar/Sort";
import View from "../common/SearchBar/View";
import AddModal from "../project/component/addModal";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Loader from "../../global/Loader";
import { Button, Grid, Typography } from "@mui/material";
import { TaskData } from "../../../interface/task";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTask } from "../../redux/slices/taskSlice";
import HomeTaskCard from "./HomeTaskCard";
import ProjectCard from "../project/component/ProjectCard";
import { ProjectData } from "../../../interface/project";
import { fetchProjects } from "../../redux/slices/projectSlice";
import { PriorityOptions, StatusOptions } from "../common/GlobalData/PSoptions";
const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const getAllTasks = async () => {
    await dispatch(fetchTask());
    setLoading(false);
  }
  const getAllProjects = async () => {
    await dispatch(fetchProjects());
    setLoading(false);
  }
  const tasks: TaskData[] = useAppSelector(
    (state) => state.tasks.taskList
  );

  const filteredTasks = tasks.filter((task) => {
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

  const projects: ProjectData[] = useAppSelector(
    (state) => state.projects.projectList
  );

  const filteredProjects = projects.filter((project) => {
    const statusLabel = StatusOptions.find((status) => status.value == project.status)?.label;
    const priorityLabel = PriorityOptions.find((priority) => priority.value == project.priority)?.label;
    const valuesToCheck = [
      project.name,
      project.description,
      statusLabel,
      priorityLabel,
    ];
    return valuesToCheck.some((value) => value?.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const dueTasks = filteredTasks.filter((task) => [1, 2, 3].includes(task.status));
  const highTasks = filteredTasks.filter((task) => task.priority === 1);
  const recentTasks = filteredTasks;
  const addProjectModalOpen = () => {
    setIsOpen(true);
  }

  // const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getAllTasks();
    getAllProjects();
  }, [dispatch]
  )

  return (
    <>
      <Box sx={{ mx: 5, p: 1, }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, }}>
          <Box sx={{ flexGrow: 1, pl: 2 }}>
            <SearchBar placeholder="Tasks And Projects" onChange={(teamName) => setSearchQuery(teamName)} />
          </Box>
          <Sort />
          <View />
          <Button onClick={addProjectModalOpen} variant="contained" sx={{ px: 3.8, borderRadius: "5px", boxShadow: 3 }}>
            Add Project
          </Button>
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <Box sx={{ marginTop: 3, overflow: 'auto' }} >
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <Typography variant="subtitle1">Due Task</Typography>
                <Box sx={{ overflow: 'auto', maxHeight: "355px", }}>
                  {/* <TaskListView tasks={dueTasks} /> */}
                  <HomeTaskCard tasks={dueTasks} />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography variant="subtitle1">Recent Tasks</Typography>
                <Box sx={{ overflow: 'auto', maxHeight: "355px", }}>
                  {/* <TaskListView tasks={recentTasks} /> */}
                  <HomeTaskCard tasks={recentTasks} />
                </Box>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Typography variant="subtitle1">High Priority Tasks</Typography>
                <Box sx={{ overflow: 'auto', maxHeight: "355px", }}>
                  {/* <TaskListView tasks={highTasks} /> */}
                  <HomeTaskCard tasks={highTasks} />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ marginBottom:5 }}>
              <Typography variant="subtitle1">Projects</Typography>
              <Box sx={{ display: 'flex', }} gap={2}>
                <ProjectCard details={filteredProjects} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Modal open={isOpen} onClose={handleClose}>
        <AddModal onclose={handleClose} />
      </Modal>
    </>
  );
};

export default Home;
