import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, CircularProgress, Box, Typography, Card } from '@mui/material';
import { useFormik } from 'formik';
import { EditTeamData, TeamData, } from '../../../../interface/team';
import { useAppDispatch } from '../../../redux/hooks';
import { editOneTeam } from '../../../redux/slices/teamSlice';
import { toast } from 'react-toastify';

const userRoles = [
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Co-worker",
  },
  {
    value: 3,
    label: "Guest",
  },
];

interface TeamDataArray {
  team: TeamData,
  modalClose: () => void,
}

const EditTeam = ({ team, modalClose }: TeamDataArray) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues: EditTeamData = {
    user_role_id: team.user_role_id,
    id: team.id,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await dispatch(editOneTeam(values));
        modalClose();
        toast.success("Edited Team successfully");
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <>
      <Card sx={{ width: 1 / 3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, boxShadow: 3 }}>
        <Box sx={{ mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }} component="form" onSubmit={formik.handleSubmit} noValidate  >
          <Typography component="h1" variant="h5" sx={{ alignSelf: 'flex-start' }}>
            Edit Team Role
          </Typography>
          <TextField InputProps={{ style: { display: 'none' } }} name="id" value={formik.values.id} />
          <FormControl fullWidth margin="normal">
            <Select size='small' name="user_role_id" value={formik.values.user_role_id} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.user_role_id && Boolean(formik.errors.user_role_id)}>
              {userRoles.map((role) => (
                <MenuItem key={role.value} value={role.value} sx={{ transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-start', borderRadius: '16px', mt: 3, }}>
            {loading ? (<CircularProgress sx={{ mx: 2 }} size={24} color="inherit" />) : ('Update')}
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default EditTeam;
