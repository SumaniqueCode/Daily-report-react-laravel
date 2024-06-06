import { Box, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <NavLink to='/dashboard/setting'><Button>Profile</Button></NavLink>
            <NavLink to='/dashboard/setting/workspace'><Button>Workspace</Button></NavLink>
        </Box>
    )
}

export default Sidebar