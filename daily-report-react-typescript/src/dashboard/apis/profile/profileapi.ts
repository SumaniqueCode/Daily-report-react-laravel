import axios from "axios";
import { BASE_URL } from "../../../../backend";
import { EditUserProfile } from "../../../../interface/userProfile";

export const userProfile =async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response;
      } catch (error) {
        console.log(error);
      }    
}


export const editUserProfile = async (value:EditUserProfile) =>{
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/edit-user`,value,{
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "app;ication/json",
      },
    });
    return response;
}
