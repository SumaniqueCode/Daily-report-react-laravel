import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProjectApi,
  deleteSelectedProject,
  editProjectApi,
  getAllProject,
} from "../../dashboard/apis/project/projectapi";

import { addProjectData } from "../../../interface/project";

import { ProjectData } from "../../../interface/project";

interface InitialState {
  projectList: ProjectData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  projectList: [],
  status: "idle",
  error: null,
};

export const fetchProjects = createAsyncThunk<
  ProjectData[],
  void,
  { rejectValue: string }
>("projects/fetchProjects", async () => {
  try {
    const response = await getAllProject();
    if (!response) {
      throw new Error("Failed to fetch projects");
    }
    return response.data.projects;
  } catch (error) {
    console.log("Error fetching projects:", error);
    throw error;
  }
});

export const deleteProject = createAsyncThunk(
  "projects/deleteProjects",
  async (projectId: number) => {
    try {
       await deleteSelectedProject(projectId);
      return projectId;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProjects",
  async (project: addProjectData) => {
    try {
       await addProjectApi(project);
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/editProject",
  async (project: addProjectData) => {
    try {
      const response = await editProjectApi(project);
      return response.data.project;
    } catch (error) {
      console.log(error);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectList = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      });
    builder
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectList = state.projectList.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete project";
      });
    builder
      .addCase(addProject.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(addProject.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add project";
      });
    builder
      .addCase(editProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export default projectSlice.reducer;
