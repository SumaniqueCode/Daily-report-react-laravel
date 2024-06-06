import { Box, Card, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { deleteOneTeam } from "../../../redux/slices/teamSlice";
import { useAppDispatch } from "../../../redux/hooks";

interface RemoveTeamProps{
  id:number,
  modalClose: ()=>void,
}

const RemoveTeam = ({id, modalClose}:RemoveTeamProps) => {
  const dispatch = useAppDispatch();

  const removeUser = async () => {
    try {
      await dispatch(deleteOneTeam(id));
      modalClose();
      toast.success("Team Removed successfully");
    } catch (error) {
      console.error("Unexpected API response");
    }
  };

  return (
    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, boxShadow: 3 }}>
      <Typography variant={'subtitle1'} sx={{ fontWeight: 'bold', mx: 3 }}>Are you sure to remove team?</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mx: 2, p: 1, px: 6, cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0", }, }} onClick={removeUser}>
          Yes
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, p: 1, mx: 3, px: 6, cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0", }, }} onClick={modalClose}>
          No
        </Typography>
      </Box>
    </Card>
  );
};

export default RemoveTeam;
