import { Box } from '@mui/system'
import SearchBar from '../../../common/SearchBar/SearchBar'
import Sort from '../../../common/SearchBar/Sort'
import { Button, Modal } from '@mui/material'
import AddTask from './components/AddTask'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { TaskData } from '../../../../../interface/task'
import TaskListView from './List/TaskListView'
import KanbanTaskView from './Kanban/KanbanTaskView'
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import { fetchTeam } from '../../../../redux/slices/teamSlice'
import { fetchTask } from '../../../../redux/slices/taskSlice'
import Loader from '../../../../global/Loader'
import { PriorityOptions, StatusOptions } from '../../../common/GlobalData/PSoptions'

const Task = () => {
  const [isAddTaskModel, setTaskOpenModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { id } = useParams();
  const{project_id} = useParams();
  const module_id: number = (id ? parseInt(id, 10) : 0);
  const projectId: number = (project_id ? parseInt(project_id, 10) : 0);
  const dispatch = useAppDispatch();
  const [iskanbanView, setKanbanView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllTasks = async () => {
    await dispatch(fetchTask());
    setLoading(false);
  }
  const allTasks: TaskData[] = useAppSelector(
    (state) => state.tasks.taskList
  );

  const tasks = allTasks.filter((task)=>{
    return task.module_id === module_id;
  })

  const getTeams = async () => {
    try {
      await dispatch(fetchTeam())
    } catch (error) {
      console.log(error);
    };
  }

  const handleAddTaskModalClose = () => {
    getTeams();
    setTaskOpenModal(false);
  }

  const handleAddBoardModalOpen = () => {
    getTeams();
    setTaskOpenModal(true);
  }
  
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

  const OpenKanbanView = () => {
    getTeams();
    setKanbanView(true);
  }

  const CloseKanbanView = () => {
    getTeams();
    setKanbanView(false);
  }

  useEffect(() => {
    getTeams();
    getAllTasks();
  }, [dispatch])

  return (
    <Box sx={{ mx: 5, p: 1, }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, }}>
        <Box sx={{ flexGrow: 1, pl: 2 }}>
          <SearchBar placeholder='task' onChange={(taskname) => setSearchQuery(taskname)} />
        </Box>
        <Sort />
        <Box sx={{ width: "100px", height: "40px", border: "1px solid #C3C3C3", borderRadius: "5px", display: "flex", justifyContent: "space-evenly", alignItems: "center", background: "white", }} >
          <ListIcon onClick={CloseKanbanView} sx={{ cursor: 'pointer' }} />
          <GridViewIcon onClick={OpenKanbanView} sx={{ cursor: 'pointer' }} />
        </Box>
        <Button variant="contained" sx={{ px: 3.8, borderRadius: "5px", boxShadow: 3 }} onClick={handleAddBoardModalOpen}>
          Add Task
        </Button>
      </Box>
      <Modal open={isAddTaskModel} onClose={handleAddTaskModalClose} >
        <AddTask handleAddTaskModalClose={handleAddTaskModalClose} projectId={projectId}/>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {iskanbanView !== true ? (
            <TaskListView tasks={filteredTasks} />
          ) : (
            <KanbanTaskView tasks={filteredTasks} />
          )
          }
        </Box>
      )}
    </Box>
  )
}

export default Task