import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addModuleApi,
  editModule,
  deleteModule,
  getAllModule,
} from "../../dashboard/apis/project/projectapi";
import {
  addModuleData,
  editModuleData,
  getModuleData,
} from "../../../interface/project";

interface InitialState {
  moduleList: getModuleData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  moduleList: [],
  status: "idle",
  error: null,
};

export const fetchModules = createAsyncThunk(
  "modules/fetchModules",
  async (projectId: string) => {
    try {
      const response = await getAllModule(projectId);
      if (!response) {
        throw new Error("Failed to fetch modules");
      }
      return response.data.modules;
    } catch (error) {
      console.log("Error fetching modules:", error);
      throw error;
    }
  }
);

export const deleteOneModule = createAsyncThunk(
  "modules/deleteModule",
  async (id: number) => {
    try {
      const response = await deleteModule(id);
      console.log("Delete module", response);
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addModule = createAsyncThunk(
  "modules/addModule",
  async (module: addModuleData) => {
    try {
      const response = await addModuleApi(module);
      console.log("using redux  ", response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const editOneModule = createAsyncThunk(
  "modules/editModule",
  async (module: editModuleData) => {
    try {
      const response = await editModule(module);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moduleList = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch modules";
      });
    builder
      .addCase(deleteOneModule.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOneModule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moduleList = state.moduleList.filter(
          (module) => module.id !== action.payload
        );
      })
      .addCase(deleteOneModule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete project";
      });
    builder
      .addCase(addModule.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(addModule.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addModule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add project";
      });
    builder
      .addCase(editOneModule.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editOneModule.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editOneModule.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default moduleSlice.reducer;
