import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./dashboard/layout";
import Home from "./dashboard/home/home";
import Project from "./dashboard/project/project";
import MyTask from "./dashboard/task/MyTask";
import Report from "./dashboard/report/report";
import Team from "./dashboard/team/team";
import Setting from "./dashboard/setting/setting";
import ProjectDetail from "./dashboard/project/projectDetail/projectDetails";
import Login from "./auth/login";
import { CssBaseline } from "@mui/material";
import Register from "./auth/register";
import Forget from "./auth/forget";
import CheckResetToken from "./auth/checkToken";
import ChangePassword from "./auth/changePassword";
import PrivateRoute from "./route/PrivateRoute";
import PrivateForgetRoute from "./route/PrivateForgetRoute";
import Logout from "./auth/logout";
import OnBoarding from "./Onboarding/Onboarding";
import GoogleLoginPage from "./auth/googleLoginPage";
import WorkspaceSetting from "./dashboard/setting/components/workspace/WorkspaceSetting";
import Task from "./dashboard/project/projectDetail/task/Task";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forget />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/google" element={<GoogleLoginPage />} />
            <Route
              path="/CheckResetToken"
              element={
                <PrivateForgetRoute>
                  <CheckResetToken />
                </PrivateForgetRoute>
              }
            />
            <Route
              path="onboarding"
              element={
                <PrivateRoute>
                  <OnBoarding />
                </PrivateRoute>
              }
            />
            <Route
              path="/changePassword"
              element={
                <PrivateForgetRoute>
                  <ChangePassword />
                </PrivateForgetRoute>
              }
            />
          </Route>
        </Routes>
        <Routes>
          <Route path="/dashboard"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            } >
            <Route index element={<Home />} />
            <Route path="project" element={<Project />} />
            <Route path="project-details/:id" element={<ProjectDetail />} />
            <Route path="task" element={<MyTask />} />
            <Route path="project-details/:project_id/module-details/:id" element={<Task />} />

            <Route path="report" element={<Report />} />
            <Route path="team" element={<Team />} />
            <Route path="setting" element={<Setting />} >
              <Route path='workspace' element={<WorkspaceSetting />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
