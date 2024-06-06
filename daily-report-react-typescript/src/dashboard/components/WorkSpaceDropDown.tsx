import { Box, Typography, IconButton, TextField, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getWorkSpace } from "../../Onboarding/api/api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SwitchWorkspace } from "../apis/workspace/workspaceapi";
import OnBoarding from "../../Onboarding/Onboarding";

interface Workspace {
  created_at: string;
  deleted_at: string | null;
  description: string | null;
  id: number;
  logo: string | null;
  name: string;
  size: string;
  slug: string;
  updated_at: string;
  user_id: number;
}

const WorkSpaceDropDown = () => {
  const [myWorkSpace, setMyWorkSpace] = useState<Workspace[]>([]);
  const [joinedWorkSpace, setJoinedWorkSpace] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddWorkspaceModal, setAddWorkspaceModal] = useState<boolean>(false);

  const [totalWorkSpace, setTotalWorkSpace] = useState<Workspace[]>([]);

  const ChangeCurrentWorkspace = async (workspace_id: number) => {
    try {
      await SwitchWorkspace(workspace_id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalClose = () => {
    setAddWorkspaceModal(false);
  }
  useEffect(() => {
    const getWorkSpaceDetails = async () => {
      const res = await getWorkSpace();
      console.log(res);
      setLoading(false);
      if (res && res.data) {
        setMyWorkSpace(res.data.my_workspace);
        setJoinedWorkSpace(res.data.joined_workspace);
        setTotalWorkSpace([
          ...totalWorkSpace,
          ...res.data.my_workspace,
          ...res.data.joined_workspace,
        ]);
      }
    };
    getWorkSpaceDetails();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1px 10px",
        flexDirection: "column",
        gap: 1,
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton type="submit" aria-label="search" sx={{ marginTop: "6px" }}>
          <SearchIcon style={{ fill: "grey" }} />
        </IconButton>
        <TextField
          id="search-bar"
          className="text"
          label="Find Team..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          size="small"
        />
        <div
          style={{
            border: "0.1px solid #BEBEBE",
            borderRadius: "4px",
            padding: "1px 5px",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Esc
        </div>
      </Box>
      <hr style={{ margin: "0px" }} />

      {/* Personal Account section */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" sx={{ fontSize: "14px", color: "grey" }}>
          Personal Workspaces
        </Typography>
        {loading ? (
          <Skeleton />
        ) : (
          myWorkSpace.map((workspace) => (
            <div onClick={() => ChangeCurrentWorkspace(workspace.id)}
              style={{
                cursor: "pointer",
                padding: "2px",
                paddingLeft: "3px",
                borderRadius: "5px",
                marginTop: "10px",
                display: "flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              <img
                src={
                  workspace.logo !== null
                    ? `${workspace.logo}`
                    : `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
                }
                alt="logo"
                height="20px"
                width="20px"
                style={{ borderRadius: "50%" }}
              />
              <Typography style={{ display: "inline", marginLeft: "10px" }}>
                {workspace.name}
              </Typography>
            </div>
          ))
        )}
      </Box>

      {/* Teams section */}
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "5px" }}>
        <Typography variant="body1" sx={{ fontSize: "14px", color: "grey" }}>
          Joined Workspaces
        </Typography>
        {loading && joinedWorkSpace.length > 0 ? (
          <Skeleton />
        ) : (
          joinedWorkSpace.map((workspace) => (
            <div onClick={() => ChangeCurrentWorkspace(workspace.id)}
              style={{
                cursor: "pointer",
                padding: "2px",
                paddingLeft: "3px",
                borderRadius: "5px",
                marginTop: "10px",
                display: "flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              <img
                src={
                  workspace.logo !== null
                    ? `${workspace.logo}`
                    : `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
                }
                alt="logo"
                height="20px"
                width="20px"
                style={{ borderRadius: "50%" }}
              />
              <Typography style={{ display: "inline", marginLeft: "10px" }}>
                {workspace.name}
              </Typography>
            </div>
          ))
        )}
      </Box>

      {/* Create Team*/}
      <Box>
        <div
          style={{
            cursor: "pointer",
            padding: "2px",
            paddingLeft: "3px",
            borderRadius: "5px",
            marginTop: "10px",
            alignItems: "center",
            display: "flex",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f0f0f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
          }}
        >
          <span>
            <IoIosAddCircleOutline
              style={{
                color: "#267fdc",
                fontSize: "22px",
                paddingBottom: "2px",
              }}
            />
          </span>
          <Typography onClick={() => setAddWorkspaceModal(true)} style={{ display: "inline", marginLeft: "10px" }}>
            Create Workspace
          </Typography>
        </div>
      </Box>
      <Modal sx={{ width:3/5, display:'absolute', top:'20%', borderRadius:3, left:'15%'}} open={isAddWorkspaceModal} onClose={handleModalClose}>
        <OnBoarding />
      </Modal>
    </Box>
  );
};

export default WorkSpaceDropDown;
