import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";
import moduleReducer from "./slices/moduleSlice";
import taskReducer from "./slices/taskSlice";
import teamReducer from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    modules: moduleReducer,
    tasks: taskReducer,
    teams: teamReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
