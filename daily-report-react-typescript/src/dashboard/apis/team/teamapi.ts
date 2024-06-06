import axios from "axios";
import { BASE_URL } from "../../../../backend";
import { AddTeamData, EditTeamData, } from "../../../../interface/team";

export const addTeam = async (data: AddTeamData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.post(
    `${BASE_URL}/send-team-invitation`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getTeam = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.get(`${BASE_URL}/get-team`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const removeTeam = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.delete(`${BASE_URL}/delete-team?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const fetchUsersByEmail = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/fetch-user`, email);
  return response;
};

export const editTeam = async (data: EditTeamData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.post(
    `${BASE_URL}/edit-team`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
