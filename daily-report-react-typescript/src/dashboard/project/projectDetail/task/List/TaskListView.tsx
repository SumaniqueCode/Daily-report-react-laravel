import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import { TaskData, } from '../../../../../../interface/task'
import ListCells from './components/ListCells'
import { Box } from '@mui/system'

interface TasksArrayProps {
    tasks: TaskData[],
}
const TaskListView = ({ tasks }: TasksArrayProps) => {
    return (
        <Box sx={{  py: 3, mx: 2, }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Desciption</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Assigned Team</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow sx={{ borderLeft: 3, position: 'relative', boxShadow: 1, cursor: "default", "&:hover": { bgcolor: '#f5f5f5' }, borderColor: `${task.status == 1 ? 'red' : task.status == 2 ? 'orange' : task.status == 3 ? 'blue' : 'green'}` }} >
                                <ListCells key={task.id} task={task} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TaskListView