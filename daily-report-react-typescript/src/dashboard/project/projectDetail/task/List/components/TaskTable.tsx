import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { TaskData } from '../../../../../../../interface/task'
import ListCells from './ListCells'

interface TaskArray {
    tasks: TaskData[],
}
const TaskTable = ({ tasks }: TaskArray) => {
    return (
        <TableContainer>
            <Table style={{ borderStyle: 'double' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Task ID</TableCell>
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
                        <TableRow sx={{ borderLeft: 3, boxShadow: 1, cursor: "default", "&:hover": { bgcolor: '#f5f5f5' }, borderColor: `${task.status == 1 ? 'red' : task.status == 2 ? 'orange' : task.status == 3 ? 'blue' : 'green'}` }} >
                            <ListCells key={task.id} task={task} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable