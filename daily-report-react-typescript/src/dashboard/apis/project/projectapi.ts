import axios from "axios";
import { BASE_URL } from "../../../../backend";
import {
  addModuleData,
  addProjectData,
  editModuleData,
} from "./../../../../interface/project";

export const addProjectApi = async (data: addProjectData) => {
  console.log(data);
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/add-project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getOneProject = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/get-project?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProject = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/get-all-project`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSelectedProject = async (id: number) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${BASE_URL}/delete-project?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const editProjectApi = async (data: addProjectData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/edit-project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

// project module api starts;

export const addModuleApi = async (data: addModuleData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/create-module`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getAllModule = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/get-all-module?project_id=${id}`,
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

export const editModule = async (data: editModuleData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/edit-module`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const deleteModule = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${BASE_URL}/delete-module?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
