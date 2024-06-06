import { Avatar, Box, Card, Grid, IconButton, Modal, Popover, Typography, } from '@mui/material'
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Workspace_Icon from "../../../../../../public/assets/Workspace_Icon.png"
import { useState } from "react";
import EditWorkSpace from './EditWorkSpace';
import { toast } from 'react-toastify';

interface WorkspaceCardData {
    workspace: any,
    hasDottedBtn: boolean,
    getWorkSpaceData: () => void,
}
const WorkSpaceCard = ({ workspace, hasDottedBtn, getWorkSpaceData }: WorkspaceCardData) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModelOpen, setModel] = useState(false);

    const handleDottedMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDottedMenuClose = () => {
        setAnchorEl(null);
    };
    const removeWorkSpace = () => {
    }
    const editWorkspace = () => {
        setModel(true);
    }
    const handleModalClose = () => {
        setModel(false);
    }
    const onSuccess = () => {
        getWorkSpaceData();
        toast.success("Workspace Updated Successfully");
        setModel(false);
    }

    return (
        <>
            <Grid item xs={12} lg={5}>
                <Card sx={{ position: 'relative', display: 'flex', px: 2, py: 2, boxShadow: 4, borderRadius: 2, }}>
                    <Avatar sx={{ width: 100, height: 100, my: 'auto', bgcolor: 'lightGray', }} alt="User Avatar"
                        src={workspace && workspace.logo ? (
                            `${workspace.logo}`) : (`${Workspace_Icon}`
                        )} />
                    <Box sx={{ mx: 2 }}>
                        <Typography variant="h6">Name: {workspace.name}</Typography>
                        <Typography variant="subtitle1">Description:{workspace.description}</Typography>
                        <Typography variant="subtitle1">Size:{workspace.size}</Typography>
                        <Typography variant="subtitle1">{new Date(workspace.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</Typography>
                    </Box>
                    {hasDottedBtn &&
                        <Box>
                            <IconButton onClick={handleDottedMenuClick} sx={{ position: 'absolute', right: '2%', top: '4%' }}>
                                <MoreHorizOutlinedIcon />
                            </IconButton>
                            <Popover sx={{ display: 'flex', flexDirection: 'column', }} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleDottedMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} transformOrigin={{ vertical: "top", horizontal: "right", }}>
                                <Box sx={{ p: 1, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={editWorkspace} >
                                    Edit
                                </Box>
                                <Box sx={{ p: 1, paddingRight: 5, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={removeWorkSpace} >
                                    Remove Workspace
                                </Box>
                            </Popover>
                            <Modal sx={{ top: '20%', left: '30%' }} open={isModelOpen} onClose={handleModalClose}>
                                <EditWorkSpace onSuccess={onSuccess} myWorkspace={workspace} />
                            </Modal>
                        </Box>
                    }
                </Card>
            </Grid>
        </>
    )
}

export default WorkSpaceCard