import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { OrgSizeOption } from "../../../../../../interface/onboarding";
import { Avatar, Card } from "@mui/material";
import { EditWorkspaceData, WorkspaceData } from "../../../../../../interface/workspace";
import { EditWorkspace } from "../../../../apis/workspace/workspaceapi";
import Workspace_Icon from "../../../../../../public/assets/Workspace_Icon.png"
import Camera_Icon from "../../../../../../public/assets/Camera_Icon.png"
import { toast } from "react-toastify";


const OrgSize: OrgSizeOption[] = [
    {
        value: "0-10",
        label: "0-10",
    },
    {
        value: "10-100",
        label: "10-100",
    },
    {
        value: "100-1000",
        label: "100-1000",
    },
    {
        value: "1000-above",
        label: "1000-above",
    },
];

const EditWorkSpace = ({ myWorkspace, onSuccess }: EditWorkspaceData) => {
    const [loading, setIsLoading] = useState(false);
    const fileInputRef = useRef<any>(null);

    const initialValues: WorkspaceData = {
        id: myWorkspace.id,
        name: myWorkspace.name,
        size: myWorkspace.size,
        description: myWorkspace.description,
        logo: myWorkspace.logo || "",
        created_at: myWorkspace.created_at,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required field"),
        size: Yup.string().required("Size is required field"),
        logo: Yup.mixed(),
    });

    const changeLogo = () => {
        fileInputRef.current.click();
    }
    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: async (data) => {
            try {
                setIsLoading(true);
                const response = await EditWorkspace(data);
                onSuccess();
                console.log(response);
                setIsLoading(false);
            } catch (error: any) {
                {
                    error.response.data.errors && error.response.data.errors.map((err: string) => (
                        toast.error(err)
                    ))
                }
                console.log(error.response.data.errors);
                setIsLoading(false);
            }
        },
    });


    return (
        <>
            <Card sx={{ width: 1 / 2, borderRadius: 3, position: 'relative' }}>
                <Typography component="h1" variant="h5" sx={{ mx: 5, my: 2, fontWeight: 600, }} >
                    Update your workspace
                </Typography>
                <Box sx={{ mx: 5, my: 2, display: "flex", flexDirection: 'column', }} component="form" onSubmit={formik.handleSubmit}>
                    {myWorkspace && myWorkspace.logo ? (
                        <Box sx={{ mx: 'auto' }}>
                            <Avatar sx={{ border: 2, width: 100, height: 100, my: 'auto', }} alt="User Avatar" onClick={changeLogo} src={myWorkspace.logo} />
                            <Avatar sx={{ position: 'absolute', top: "14.5%%", border: 2, width: 100, height: 100, my: 'auto', opacity: 0, transition: 'opacity 0.3s', cursor: "pointer", "&:hover": { opacity: '50%' }, }} alt="User Avatar" src={Camera_Icon} onClick={changeLogo} />
                        </Box>
                    ) : (
                        <Box sx={{ mx: 'auto' }}>
                            <Avatar sx={{ border: 2, width: 100, height: 100, my: 'auto', }} alt="User Avatar" onClick={changeLogo} src={Workspace_Icon} />
                            <Avatar sx={{ position: 'absolute', top: "14.5%", border: 2, width: 100, height: 100, my: 'auto', opacity: 0, transition: 'opacity 0.3s', cursor: "pointer", "&:hover": { opacity: '50%' }, }} alt="User Avatar" src={Camera_Icon} onClick={changeLogo} />
                        </Box>
                    )}
                    <Box sx={{ width: 1 }}>
                        <input type="file" ref={fileInputRef} name="logo" style={{ display: 'none' }} />
                        <TextField margin="normal" size='small' name="name" label="Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} required fullWidth />
                        <TextField margin="normal" multiline rows={3} size='small' name="description" label="Description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} required fullWidth />
                        <TextField select defaultValue={myWorkspace.size} margin="normal" size='small' name="size" label="Organization Size" value={formik.values.size} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.size && Boolean(formik.errors.size)} helperText={formik.touched.size && formik.errors.size} required fullWidth   >
                            {OrgSize.map((size) => (
                                <MenuItem key={size.value} value={size.value}>
                                    {size.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1, bgcolor: "primary", borderRadius: "25px", }}>
                            {loading ? (
                                <CircularProgress size={24} sx={{ mx: 8.2 }} color="inherit" />
                            ) : (
                                "Update workspace"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default EditWorkSpace;
