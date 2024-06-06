// Column.tsx
import { useDrop } from 'react-dnd';
import { Box } from '@mui/system';
import { TaskData } from '../../../../../../interface/task';
import { StatusOptions } from '../../../../common/GlobalData/PSoptions';
import { Typography } from '@mui/material';
import KanbanCard from './KanbanCard';
interface ColumnProps {
    status: number,
    tasks: TaskData[],
    onDrop: (taskId: TaskData, newStatus: number) => void;
}
interface ItemProps{
    task: TaskData,
}

const Column = ({ status, tasks, onDrop, }: ColumnProps) => {
    const handleDrop = (newTask: TaskData, status: number) => {
        onDrop(newTask, status);
    }
    const [{ isOver }, drop] = useDrop({
        accept: 'task',
        drop: (item: ItemProps) => handleDrop(item.task, status),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    return (
        <>
            <Box
                ref={drop}
                style={{
                    width: `${isOver ? '362px' : '360px'}`,
                    minHeight: '200px',
                }}
                className='kanban-column'
                sx={{ borderTop: 3, p: 2, borderColor: `${status == 1 ? 'red' : status == 2 ? 'orange' : status == 3 ? 'blue' : 'green'}` }}
            >
                {StatusOptions.filter(option => option.value === status).map(option =>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                        {option.label}
                    </Typography>
                )}
                <Box className="kanban-task-column">
                    {tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                            <Box>
                                <KanbanCard key={task.id} task={task} />
                            </Box>
                        ))}
                </Box>
            </Box>
        </>
    );
};

export default Column;
