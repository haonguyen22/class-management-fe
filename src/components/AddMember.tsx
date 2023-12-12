import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import React, {  useState } from 'react';
import * as yup from 'yup';
import { handleAxiosReponse } from '../utils/handleReponse';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { classService } from '../services/class/ClassService';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

interface AddMemberProps {
  open: boolean;
  setClose: ()=>void;
  type: string;
}

const AddMember: React.FC<AddMemberProps> = ({ open, setClose, type }) => {
  const {id} = useParams<{id:string}>();
  const authHeader = useAuthHeader();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = authHeader().replace('Bearer ', '');
      console.log(values);
      const res = await classService.addMember(values.email, id, type, token );
      handleAxiosReponse(res, {
        ifSuccess: (data) => {
          console.log(data);
          setClose();
          window.location.reload();
        },
        ifFailed: (err) => {
          setError(err.response?.data?.message);
        }
      });
    },
  });

  const onCancel = () => {
    formik.resetForm();
    setError(undefined);
    setClose();
  };

  return (
    <Dialog onClose={onCancel} open={open} classes={{paper:'w-full'}}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{`Add ${type}`}</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
        </DialogContent>
        {error &&<DialogContent className='text-red-500'>
           {error}
        </DialogContent>}

        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit' variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMember;
