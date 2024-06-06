import { useEffect, useState } from "react";
import AddTeam from "./components/AddTeam";
import { Box, Button, Modal, Grid, } from "@mui/material";
import TeamCard from "./components/TeamCard";
import Loader from "../../global/Loader";
import Sort from "../common/SearchBar/Sort";
import View from "../common/SearchBar/View";
import SearchBar from "../common/SearchBar/SearchBar";
import { useAppDispatch } from "../../redux/hooks";
import { fetchTeam } from "../../redux/slices/teamSlice";
import { TeamData, } from "../../../interface/team";

const Team = () => {
  const [isAddTeamModel, setIsAddTeamModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const [teams, setTeams] = useState<TeamData[]>();

  const getTeams = async () => {
    try {
      const response = await dispatch(fetchTeam());
      console.log("Team data", response.payload);
      setTeams(response.payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeamModalOpen = () => {
    setIsAddTeamModel(true);
    getTeams();
  };

  const handleAddTeamModalClose = () => {
    setIsAddTeamModel(false);
    getTeams();
  };

  const filteredTeams = teams && teams.filter((team) =>
  [
    team.user.display_name,
    team.user.name,
    team.user.email,
    team.status,
    team.user_role_id === 1 ? "admin" : team.user_role_id === 2 ? "coworker" : "guest"
  ].some((value) => value?.toLowerCase().includes(searchQuery.toLowerCase()))
);

useEffect(() => {
  getTeams();
}, [dispatch]);


  return (
    <>
      <Box sx={{ mx: 5, p: 1, }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, }}>
          <Box sx={{ flexGrow: 1, pl: 2 }}>
            <SearchBar placeholder="Teams" onChange={(teamName) => setSearchQuery(teamName)} />
          </Box>
          <Sort />
          <View />
          <Button onClick={handleAddTeamModalOpen} variant="contained" sx={{ px: 3.8, borderRadius: "5px", boxShadow: 3 }}>
            Add Team
          </Button>
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <Box sx={{ py: 3, mx: 2, }}>
            <Grid container spacing={3}>
              {filteredTeams &&
                filteredTeams.map((team) => (
                  <Grid item key={team.id} xs={12} lg={4}>
                    <TeamCard team={team} getTeams={getTeams}/>
                  </Grid>
                ))}
            </Grid>

            <Modal open={isAddTeamModel} onClose={handleAddTeamModalClose}>
              <AddTeam handleAddTeamModalClose={handleAddTeamModalClose} />
            </Modal>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Team;
