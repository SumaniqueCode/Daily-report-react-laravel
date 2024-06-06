import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Box, Typography, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { AddTeamData, } from '../../../../interface/team';
import { fetchUsersByEmail } from '../../apis/team/teamapi';
import { useAppDispatch } from '../../../redux/hooks';
import { sendTeamInvitation } from '../../../redux/slices/teamSlice';

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

interface AddTeamProps {
  handleAddTeamModalClose: () => void,
}
interface FetchUserProps {
  email: string,
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  user_role_id: Yup.number().required('User Role is required'),
});


const AddTeam = ({ handleAddTeamModalClose }: AddTeamProps) => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const initialValues: AddTeamData = {
    user_role_id: 1,
    email: '',
  }

  const [users, setUsers] = useState<AddTeamData[]>([]);
  const [emailOptionClicked, setEmailOptionClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await dispatch(sendTeamInvitation(values));
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success("Invitation Sent successfully");
          handleAddTeamModalClose();
        }
        if ('error' in response) {
          toast.error(response.error.message);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    },
  });

  const handleInputChange = async ({ email }: FetchUserProps) => {
    try {
      const response = await fetchUsersByEmail(email);
      setUsers(response.data.users);
      setEmailOptionClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailOptionClick = () => {
    setEmailOptionClicked(true);
  };


  return (
    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, boxShadow: 3, }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: 'relative', zIndex: 1 }}>
        <Typography component="h1" variant="h5" sx={{ alignSelf: 'flex-start' }}>
          Add Team
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField size='small' autoComplete="off" label="Email" name="email" value={formik.values.email} onChange={(e) => { formik.handleChange(e); handleInputChange({ email: e.target.value }); }} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} margin="normal" required fullWidth />
          {users && users.length > 0 && !emailOptionClicked && (
            <Card sx={{ position: 'absolute', top: '40%', boxShadow: 2, width: 1, zIndex: 2 }}>
              {users.map((user, index) => (
                <Box key={index} onClick={() => { handleEmailOptionClick(); formik.handleChange({ target: { name: 'email', value: user.email } }); }} sx={{ cursor: 'pointer', boxShadow: 1, p: 1 }}>
                  {user.email}
                </Box>
              ))}
            </Card>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>User Role</InputLabel>
            <Select size='small' label="User Role" name="user_role_id" value={formik.values.user_role_id} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.user_role_id && Boolean(formik.errors.user_role_id)}>
              {userRoles.map((role) => (
                <MenuItem key={role.value} value={role.value} sx={{ transition: "background-color 0.3s", cursor: "pointer", "&:hover": { backgroundColor: '#f0f0f0', }, }}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '25px', mt: 3 }}>
            {loading ? (<CircularProgress sx={{ marginLeft: 6, marginRight: 6.5 }} size={24} color="inherit" />) : ('Send Invitation')}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AddTeam;
