import axios from "axios";
import { WorkspaceData } from "../../../../interface/workspace";
import { BASE_URL } from "../../../../backend";

export const EditWorkspace = async (data: WorkspaceData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.post(
    `${BASE_URL}/edit-workspace`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const SwitchWorkspace = async (workspace_id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const response = await axios.post(
      `${BASE_URL}/switch-workspace?workspace_id=${workspace_id}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("workspace_id", response.data.id);
    return response;
  } catch (error) {
    console.log(error);
  }
}
