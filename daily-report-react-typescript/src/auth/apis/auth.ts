import { BASE_URL } from "./../../../backend";
import axios from "axios";
import {
  RegisterData,
  loginData,
  forgotData,
  tokenData,
  changePasswordData,
} from "./../../../interface/auth";

export const register = async (data: RegisterData) => {
  console.log(BASE_URL);
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  return response;
};

export const login = async (data: loginData) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("AuthUserId", response.data.user.id);
  return response;
};

export const googleLogin = async () => {
  const response = await axios.get(`${BASE_URL}/auth/google-login`);
  // localStorage.setItem("AuthUserId", response.data.user.id);
  console.log("Google response" , response);
  return response;
};

export const forgotPassword = async (data: forgotData) => {
  const response = await axios.post(
    `${BASE_URL}/auth/forgot-password?email=${data.email}`
  );
  return response;
};

export const checkToken = async (data: tokenData) => {
  const response = await axios.post(
    `${BASE_URL}/auth/check-reset-token?token=${data.token}&email=${data.email}`
  );
  return response;
};

export const changePassword = async (data: changePasswordData) => {
  const response = await axios.post(
    `${BASE_URL}/auth/change-password?email=${data.email}&password=${data.password}&password_confirmation=${data.password_confirmation}`
  );
  return response;
};

export const isLoggedIn = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
     await axios.get(`${BASE_URL}/login-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    return true;
  } catch (error) {
    console.log(error);
  }
};
