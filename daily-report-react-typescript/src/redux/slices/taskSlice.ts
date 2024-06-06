import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editTask, getAllTask, newTask, removeTask } from "../../dashboard/apis/task/taskapi";
import { AddTaskData, EditTaskData, TaskData } from "../../../interface/task";

interface InitialState {
    taskList: TaskData[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: InitialState = {
    taskList: [],
    status: "idle",
    error: null,
};

export const fetchTask = createAsyncThunk(
    "tasks/fetchTask",
    async () => {
        try {
            const response = await getAllTask();
            if (!response) {
                throw new Error("Failed to fetch Task");
            }
            return response.data.task;
        } catch (error) {
            console.log("Error fetching task:", error);
            throw error;
        }
    }
);

export const deleteOneTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id: number) => {
        try {
             await removeTask(id);
            return id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task: AddTaskData) => {
        try {
             await newTask(task);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
              throw error.response.data.errors[0];
            } else {
              throw error;
            }
          }
    }
);

export const editOneTask = createAsyncThunk(
  'tasks/editTask',
  async (task: EditTaskData) => {
    try {
      const response = await editTask(task);
      return response; // Return the response if needed
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        throw error.response.data.errors[0];
      } else {
        throw error;
      }
    }
  }
);


export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.taskList = action.payload;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch Task";
            });
        builder
            .addCase(deleteOneTask.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteOneTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.taskList = state.taskList.filter(
                    (task) => task.id !== action.payload
                );
            })
            .addCase(deleteOneTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to delete Task";
            });
        builder
            .addCase(addTask.pending, (state) => {
                (state.status = "loading"), (state.error = null);
            })
            .addCase(addTask.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to add Task";
            });
        builder
            .addCase(editOneTask.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editOneTask.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(editOneTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to edit Team";
            });
    },
});

export default taskSlice.reducer;
