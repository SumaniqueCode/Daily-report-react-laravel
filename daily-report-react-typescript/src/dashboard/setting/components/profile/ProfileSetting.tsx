import { Avatar, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { editUserProfile } from "../../../apis/profile/profileapi"
import User_Icon from "../../../../../public/assets/User_Icon.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditUserProfile, UserProfile } from "../../../../../interface/userProfile";
import Camera_Icon from "../../../../../public/assets/Camera_Icon.png";
import { useRef, useState } from "react";

const ProfileSetting = ({ user, getUserData }: UserProfile) => {
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<any>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [displayName, setDisplayName] = useState(user.display_name);

    const changeProfile = () => {
        fileInputRef.current.click();
    }

    const initialValues: EditUserProfile = {
        name: user.name,
        display_name: user.display_name,
        profile_picture: user.profile_picture,
        old_password: "",
        password: "",
        password_confirmation: "",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        display_name: Yup.string().required("Display name is a required"),
        old_password: Yup.string(),
        password: Yup.string()
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        password_confirmation: Yup.string()
            .test("passwords-match", "Passwords must match", function (value) {
                return this.parent.password === value;
            }),
    });


    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await editUserProfile(values);
                getUserData();
                setLoading(false);
                setMessage(response.data.message)
                setTimeout(() => {
                    setMessage("");
                }, 3000);
                resetForm();
                console.log(response);
            } catch (error) {
                setError((error as any).response.data.errors);
                console.log(error);
                setLoading(false);
                setTimeout(() => {
                    setError("");
                }, 4000);
            }
        },
    });

    return (
        <>
            <Box sx={{ width: 1, mx: 4, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }} component="form" onSubmit={formik.handleSubmit} noValidate>
                <Typography alignSelf="flex-start" variant="h6">Profile Settings</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', }} onClick={changeProfile}>
                    <Box>
                        <Avatar sx={{ border: 2, bgcolor: 'lightGray', width: 100, height: 100, my: 'auto', }} alt="User Avatar"
                            src={user && user.profile_picture ? (
                                `${user.profile_picture}`
                            ) : (`${User_Icon}`)} />
                        <Avatar sx={{ position: 'absolute', top: "26.5%", border: 2, width: 100, height: 100, my: 'auto', opacity: 0, transition: 'opacity 0.3s', cursor: "pointer", "&:hover": { opacity: '50%' }, }} alt="User Avatar" src={Camera_Icon} />
                    </Box>
                </Box>
                <input type="file" ref={fileInputRef} name="profile_picture" style={{ display: 'none' }} />
                <Box sx={{ width: 1, display: "flex", gap: 2, }} >
                    <TextField size='small' name="display_name" label="Display Name" value={displayName} onChange={(e) => { formik.handleChange(e); setDisplayName(e.target.value); }} onBlur={formik.handleBlur} error={formik.touched.display_name && Boolean(formik.errors.display_name)} helperText={formik.touched.name && formik.errors.display_name} required fullWidth />
                    {user && user.name ? (
                        <Box sx={{ width: 1 }}>
                            <TextField disabled size='small' name="name" label="Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} required fullWidth />
                            <Typography variant="subtitle2" sx={{ color: 'grey' }}>Note: Name cannot be changed.</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: 1 }}>
                            <TextField size='small' name="name" label="Display Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} required fullWidth />
                            <Typography variant="subtitle2" sx={{ color: 'grey' }}>Note: Name can only be changed once.</Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{ width: 1, display: "flex", gap: 2, }} >
                    <TextField size='small' name="old_password" label="Old Password" value={formik.values.old_password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.old_password && Boolean(formik.errors.old_password)} helperText={formik.touched.old_password && formik.errors.old_password} fullWidth />
                    <TextField size='small' name="password" label="New Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} fullWidth />
                    <TextField size='small' name="password_confirmation" label="Confirm Password" value={formik.values.password_confirmation} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)} helperText={formik.touched.password_confirmation && formik.errors.password_confirmation} fullWidth />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-start', borderRadius: '16px', mt: 3, }}>
                    {loading ? (<CircularProgress sx={{ mx: 2.1 }} size={24} color="inherit" />) : ('Update')}
                </Button>
            </Box>
            <Box sx={{ position: 'absolute', top: '10%', right: message ? '0%' : '-25%', transition: 'right 0.5s ease-in-out', backgroundColor: '#64dd17', borderRadius: 1, color: 'white', p: 1, px: 5, visibility: message ? 'visible' : 'hidden', }} >
                <Typography variant="subtitle1">{message}</Typography>
            </Box>
            <Box sx={{ position: 'absolute', top: '10%', right: error ? '0%' : '-25%', transition: 'right 0.5s ease-in-out', backgroundColor: 'secondary.main', borderRadius: 1, color: 'white', p: 1, px: 5, visibility: error ? 'visible' : 'hidden', }} >
                <Typography variant="subtitle1">{error}</Typography>
            </Box>
        </>
    )
}

export default ProfileSetting