import { Box } from '@mui/system'
import { TaskData } from '../../../interface/task'
import { Card, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { PriorityOptions, StatusOptions } from '../common/GlobalData/PSoptions'

interface TasksArrayProps{
    tasks: TaskData[];
}

const HomeTaskCard = ({tasks}:TasksArrayProps) => {
  return (
    <Box>  
        {tasks.map((task) => (
                 <Card sx={{ p: 0.5, px:1, mb: 2, border: 1, borderColor:`${task.status==4? 'green': 'secondary.dark'}`}}>
                     <Typography sx={{ fontSize: 12 }}>{task.name}</Typography>
                     <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                         <Typography sx={{ fontSize: 12 }}>
                             Updated {formatDistanceToNow(new Date(task.updated_at), {
                                 addSuffix: true,
                             })}</Typography>
                         <Box sx={{ display: 'flex', gap: 0.5 }}>
                             <Typography sx={{ fontSize: 12 }}> Status</Typography>
                             <Typography sx={{ fontSize: 12, color: `${task.status == 1 ? 'red' : task.status == 2 ? 'orange' : task.status == 3 ? 'blue' : 'green'}` }}>
                                 {
                                     StatusOptions.find(
                                         (status) => status.value == task.status
                                     )?.label
                                 }
                             </Typography>
                             <Typography sx={{ fontSize: 12 }}> Priority</Typography>
                             <Typography sx={{ fontSize: 12, color: `${task.priority == 1 ? 'red' : task.priority == 2 ? 'blue' : 'green'}` }}>
                                 {
                                     PriorityOptions.find(
                                         (priority) => priority.value == task.priority
                                     )?.label
                                 }
                             </Typography>
                         </Box>
                     </Box>
                 </Card>
             ))}
    </Box>
  )
}

export default HomeTaskCard