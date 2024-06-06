import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddTeamData, EditTeamData, TeamData } from "../../../interface/team";
import { addTeam, editTeam, getTeam, removeTeam } from "../../dashboard/apis/team/teamapi";
interface InitialState {
    teamList: TeamData[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: InitialState = {
    teamList: [],
    status: "idle",
    error: null,
};

export const fetchTeam = createAsyncThunk(
    "teams/fetchTeam",
    async () => {
        try {
            const response = await getTeam();
            if (!response) {
                throw new Error("Failed to fetch Team");
            }
            return response.data.team;
        } catch (error) {
            console.log("Error fetching Team:", error);
            throw error;
        }
    }
);

export const deleteOneTeam = createAsyncThunk(
    "teams/deleteTeam",
    async (id: number) => {
        try {
            await removeTeam(id);
            return id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const sendTeamInvitation = createAsyncThunk(
    "teams/addTeam",
    async (team: AddTeamData) => {
        try {
            await addTeam(team);
        } catch (error: any) {
            throw error.response.data.errors;
        }
    }
);

export const editOneTeam = createAsyncThunk(
    "teams/editTeam",
    async (team: EditTeamData) => {
        try {
            await editTeam(team);
        } catch (error: any) {
            console.log(error);
            throw error.response.data.errors;
        }
    }
);

export const TeamSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeam.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTeam.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.teamList = action.payload;
            })
            .addCase(fetchTeam.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch Team";
            });
        builder
            .addCase(deleteOneTeam.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteOneTeam.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.teamList = state.teamList.filter(
                    (team) => team.id !== action.payload
                );
            })
            .addCase(deleteOneTeam.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to delete Team";
            });
        builder
            .addCase(sendTeamInvitation.pending, (state) => {
                (state.status = "loading"), (state.error = null);
            })
            .addCase(sendTeamInvitation.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(sendTeamInvitation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to add Team";
            });
        builder
            .addCase(editOneTeam.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editOneTeam.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;

            })
            .addCase(editOneTeam.rejected, (state) => {
                state.status = "failed";
                state.error = null;
            });
    },
});

export default TeamSlice.reducer;
