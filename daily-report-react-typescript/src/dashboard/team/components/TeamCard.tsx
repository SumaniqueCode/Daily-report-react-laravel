import { useState } from "react";
import { Box, Card, Typography, Avatar, IconButton, Popover, Modal, } from "@mui/material";
import EditTeam from "../components/EditTeam";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import RemoveTeam from "./RemoveTeam";
import UserIcon from "../../../../public/assets/User_Icon.png"
import { TeamData } from "../../../../interface/team";

interface TeamArray {
  team: TeamData,
  getTeams: () => void,
}
const TeamCard = ({ team, getTeams }: TeamArray) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditTeamModal, setEditTeamModal] = useState<boolean>(false);
  const [isRemoveTeamModal, setRemoveTeamModal] = useState<boolean>(false);

  const handleDottedMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDottedMenuClose = () => {
    setAnchorEl(null);
  };

  const modalClose = () => {
    getTeams();
    setEditTeamModal(false);
    setRemoveTeamModal(false);
    setAnchorEl(null);
  }

  return (
    <>
      <Card sx={{ px: 3, py: 2, boxShadow: 3, transition: "background-color 0.2s", cursor: "default", "&:hover": { bgcolor: '#f5f5f5' }, }} >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", }}>
            <Avatar sx={{ width: 100, height: 100, my: 'auto', bgcolor: 'lightGray' }} alt="team.Users Avatar"
              src={team.user.profile_picture ? (
                `${team.user.profile_picture}`) : (`${UserIcon}`
              )} />
            <Box sx={{ mx: 2 }}>
              <Typography variant="h6">{team.user.display_name}</Typography>
              <Typography variant="subtitle1">{team.user.email}</Typography>
              <Typography variant="body2">Status: {team.status}</Typography>
              <Typography variant="body2">
                Role: {team.user_role_id === 1 ? "Admin" : team.user_role_id === 2 ? "Co-worker" : "Guest"}
              </Typography>
              <Typography variant="body2">
                Since: {new Date(team.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleDottedMenuClick} sx={{ mb: "auto" }}>
            <MoreHorizOutlinedIcon />
          </IconButton>
          <Popover sx={{ borderRadius:3, boxShadow:3 }} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleDottedMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "right", }} transformOrigin={{ vertical: "top", horizontal: "right", }}>
            <Typography sx={{ p: 1, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={() => setEditTeamModal(true)}>Edit</Typography>
            <Typography sx={{ p: 1, transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }} onClick={() => setRemoveTeamModal(true)}>Remove</Typography>
          <Typography sx={{ mx:12 }}></Typography>
          </Popover>

          <Modal open={isEditTeamModal} onClose={modalClose}>
            <EditTeam key={team.id} modalClose={modalClose} team={team} />
          </Modal>

          <Modal open={isRemoveTeamModal} onClose={modalClose}>
            <RemoveTeam modalClose={modalClose} key={team.id} id={team.id} />
          </Modal>
        </Box>
      </Card>
    </>
  );
};

export default TeamCard;
