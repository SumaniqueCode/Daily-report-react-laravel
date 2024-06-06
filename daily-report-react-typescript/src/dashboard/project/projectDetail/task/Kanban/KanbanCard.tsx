// Task.tsx
import { Avatar, AvatarGroup, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { TaskData } from '../../../../../../interface/task';
import { Box } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import UserIcon from '../../../../../../public/assets/User_Icon.png'
interface TaskArrayProps {
    task: TaskData,
}

const KanbanCard = ({ task, }: TaskArrayProps) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { task },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <>
            <Box
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    padding: '8px',
                    marginBottom: '8px',
                    margin: '10px 0px',
                }}
                sx={{ borderLeft: 2, borderColor: `${task.status == 1 ? 'red' : task.status == 2 ? 'orange' : task.status == 3 ? 'blue' : 'green'}`, }}
                className='kanban-task' >
                <p> {task.name}</p>
                <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }} >
                    <Box className="time">
                        Updated{" "}
                        <Typography variant="subtitle2" sx={{ display: 'inline', }} >
                            {formatDistanceToNow(new Date(task.updated_at), {
                                addSuffix: true,
                            })}
                        </Typography>
                    </Box>
                    {/* <Box sx={{ display: "flex", gap: "5px", fontSize: "13px", }}>
                    Status
                    <Box sx={{ color: "green" }}>
                        {
                            StatusOptions.find(
                                (status) => status.value == task.status
                            )?.label
                        }{" "}
                    </Box>
                    Priority
                    <Box sx={{ color: "red" }}>
                        {
                            PriorityOptions.find(
                                (priority) => priority.value == task.priority
                            )?.label
                        }{" "}
                    </Box>
                </Box> */}
                    <div className="assinged-to" >
                        <AvatarGroup >
                            {task.assigned_team.map((team) => (
                                <Avatar sx={{ bgcolor: 'lightGray', width: 24, height: 24 }}
                                    src={
                                        team.profile_picture !== null
                                            ? `${team.profile_picture}`
                                            : `${UserIcon}`
                                    } />
                            ))}
                        </AvatarGroup>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default KanbanCard;

