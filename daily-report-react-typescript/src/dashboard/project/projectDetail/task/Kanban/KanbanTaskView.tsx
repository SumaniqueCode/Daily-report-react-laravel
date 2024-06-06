// Kanban.tsx
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditTaskData, TaskData } from '../../../../../../interface/task';
import Column from './Column';
import { Box } from '@mui/system';
import { editOneTask, fetchTask } from '../../../../../redux/slices/taskSlice';
import { useAppDispatch } from '../../../../../redux/hooks';
import { CircularProgress } from '@mui/material';

interface TaskArrayProps {
    tasks: TaskData[],
}

const KanbanTaskView = ({ tasks }: TaskArrayProps) => {
    const [taskdata, setTaskData] = useState(tasks);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const editTaskData = async (newTaskData: TaskData, newStatus: number) => {
        // onDrop(id, newStatus);
        const values: EditTaskData = {
            id: newTaskData.id,
            name: newTaskData.name,
            description: newTaskData.description ? newTaskData.description : null,
            start_date: newTaskData.start_date ? newTaskData.start_date : null,
            due_date: newTaskData.due_date ? newTaskData.due_date : null,
            status: newStatus,
            priority: newTaskData.priority,
            assigned_team: newTaskData.assigned_team.map(team => team.id),
        }
        try {
            setLoading(true);
           await dispatch(editOneTask(values));
           await dispatch(fetchTask());
           setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDrop = (newTaskData: TaskData, newStatus: number) => {
        editTaskData(newTaskData, newStatus);
        const updatedTasks = tasks.map((task) =>
            task.id === newTaskData.id ? { ...task, status: newStatus } : task
        );
        setTaskData(updatedTasks);
    };
    return (
        <DndProvider backend={HTML5Backend}>
            {loading&&(
                <CircularProgress sx={{position: "absolute", top: "50%", left: "50%",opacity:1}}/>
            )}
            <Box sx={{ display: 'flex',gap:3, marginTop: '20px', justifyContent: 'space-around', width: 1, overflow: 'scroll' }}>
                <Column status={1} tasks={taskdata} onDrop={handleDrop} />
                <Column status={2} tasks={taskdata} onDrop={handleDrop} />
                <Column status={3} tasks={taskdata} onDrop={handleDrop} />
                <Column status={4} tasks={taskdata} onDrop={handleDrop} />
            </Box>
        </DndProvider>
    );
};

export default KanbanTaskView;
