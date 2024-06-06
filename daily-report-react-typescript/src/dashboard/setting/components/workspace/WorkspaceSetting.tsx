import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getWorkSpace } from "../../../../Onboarding/api/api"
import WorkSpaceCard from "./components/WorkSpaceCard"
import Loader from "../../../../global/Loader"
import { WorkspaceData } from "../../../../../interface/workspace"
import { ToastContainer } from "react-toastify"

const WorkspaceSetting = () => {
    const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceData>();
    const [myWorkspaces, setMyWorkspaces] = useState<WorkspaceData[]>([]);
    const [joinedWorkspaces, setJoinedWorkspaces] = useState<WorkspaceData[]>([]);
    const [loading, setLoading] = useState(true);


    const getWorkSpaceData = async () => {
        try {
            const response = await getWorkSpace();
            if (response) {
                setLoading(false);
                setCurrentWorkspace(response.data.current_workspace);
                setMyWorkspaces(response.data.my_workspace);
                setJoinedWorkspaces(response.data.joined_workspace);
                console.log(response.data);
            }

        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }
    useEffect(() => {
        getWorkSpaceData();
    }, [])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Box sx={{ width: 1, mx: 4, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                    <Typography alignSelf="flex-start" variant="h6">WorkSpace Settings</Typography>
                    <Box sx={{ width: 1, }}>
                        <Typography sx={{ marginTop: 2, width: 1, }}>Current Workspace:</Typography>
                        <Grid container spacing={3}>
                            <WorkSpaceCard getWorkSpaceData={getWorkSpaceData} hasDottedBtn={false} workspace={currentWorkspace} />
                        </Grid>
                        <Typography sx={{ marginTop: 2, width: 1, }}>My Workspaces:</Typography>
                        <Grid container spacing={3}>
                            {myWorkspaces && myWorkspaces.map((myWorkspace) => (
                                <WorkSpaceCard getWorkSpaceData={getWorkSpaceData} hasDottedBtn={true} workspace={myWorkspace} />
                            ))}
                        </Grid>

                        <Typography sx={{ marginTop: 2, width: 1, }}>Joined Workspaces:</Typography>
                        <Grid container spacing={3}>
                            {joinedWorkspaces && joinedWorkspaces.map((joinedWorkspace) => (
                                <WorkSpaceCard getWorkSpaceData={getWorkSpaceData} hasDottedBtn={false} workspace={joinedWorkspace} />
                            ))}
                        </Grid>
                    </Box>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                </Box>
            )}
        </>
    )
}

export default WorkspaceSetting