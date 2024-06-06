import axios from "axios";
import { BASE_URL } from "./../../../backend";
import { CreateWorkSpaceData } from "./../../../interface/onboarding";

export const createWorkSpace = async (data: CreateWorkSpaceData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.post(
    `${BASE_URL}/create-workspace?name=${data.name}&size=${data.size}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getWorkSpace = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.get(`${BASE_URL}/get-workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const checkWorkSpaceExist = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.get(`${BASE_URL}/get-workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.data.my_workspace.length == 0) {
    return false;
  }
  return true;
};
