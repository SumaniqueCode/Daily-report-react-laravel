import { IconButton, Modal, Popover } from "@mui/material"
import { Box } from "@mui/system"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import { TaskData } from "../../../../../../../interface/task";
import EditTask from "../../components/EditTask";
import DeleteTask from "../../components/DeleteTask";


interface TaskArrayProps {
    task: TaskData,
    setDottedBtn : React.Dispatch<React.SetStateAction<boolean>>,
}

const DottedBtn = ({ task, setDottedBtn  }: TaskArrayProps) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditTaskModelOpen, setEditTaskModel] = useState<boolean>(false);
    const [isRemoveTaskModelOpen, setRemoveTaskModel] = useState<boolean>(false);

    const handleDottedMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDottedMenuClose = () => {
        setAnchorEl(null);
        setDottedBtn (false);
    };
    const handleModalClose = () => {
        setEditTaskModel(false);
        setRemoveTaskModel(false);
        handleDottedMenuClose();
        }
    return (
        <>
            <IconButton sx={{  mx:1 }} onClick={handleDottedMenuClick}>
            <MoreHorizOutlinedIcon sx={{ position:'absolute', fontSize:'30px',}}/>
            </IconButton>
            <Popover sx={{ display: 'flex', flexDirection: 'column', }} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleDottedMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "left", }} transformOrigin={{ vertical: "top", horizontal: "left", }}>
                <Box sx={{ p: 1, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={()=>setEditTaskModel(true)} >
                    Edit
                </Box>
                <Box sx={{ p: 1, paddingRight: 5, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={()=>setRemoveTaskModel(true)} >
                    Remove Task
                </Box>
            </Popover>

            <Modal open={isEditTaskModelOpen} onClose={handleModalClose}>
                <EditTask handleModalClose={handleModalClose} task={task} />
            </Modal>
            <Modal open={isRemoveTaskModelOpen} onClose={handleModalClose}>
                <DeleteTask handleModalClose={handleModalClose} task={task} />
            </Modal>
        </>
    )
}

export default DottedBtn