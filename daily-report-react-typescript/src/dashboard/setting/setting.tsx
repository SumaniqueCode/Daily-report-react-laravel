import { useEffect, useState } from "react";
import { userProfile } from "../apis/profile/profileapi"
import ProfileSetting from "./components/profile/ProfileSetting";
import { Box } from "@mui/material";
import Loader from "../../global/Loader";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";


const Setting = () => {
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const getUserData = async () => {
        try {
            const response = await userProfile();
            if (response) {
                setUser(response.data);
                setLoading(false);
                console.log(response.data);
            }
            else {
                console.log("Error in getting the data");
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const isSettingRoute = location.pathname;


    return (
        <>
            <Box sx={{ mx: 8, my: 2, display: 'flex', alignItems: 'start', width: 1, }}>
                <Sidebar />
                {isSettingRoute === "/dashboard/setting" ? (
                    <Box sx={{ width: 1 }}>
                        {loading ? (
                            <Loader />
                        ) : (
                            <ProfileSetting getUserData={getUserData} user={user?.user} />
                        )}
                    </Box>
                ) : (<Outlet />
                )}
            </Box>
        </>
    )
}

export default Setting