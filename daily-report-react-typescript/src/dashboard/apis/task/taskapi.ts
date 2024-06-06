import axios from "axios";
import { BASE_URL } from "../../../../backend";

import { AddTaskData, EditTaskData } from "../../../../interface/task";

export const newTask = async (data: AddTaskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  console.log("Adding task Data", data);
  const response = await axios.post(
    `${BASE_URL}/add-task`,data,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  return response;
};

export const getAllTask = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BASE_URL}/get-all-task`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getMyTask = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${BASE_URL}/get-my-task`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const removeTask = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.delete(`${BASE_URL}/delete-task?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};


export const editTask = async (data: EditTaskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await axios.post(
    `${BASE_URL}/edit-task`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
