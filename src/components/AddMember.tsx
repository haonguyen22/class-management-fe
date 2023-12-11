import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { handleAxiosReponse } from '../utils/handleReponse';
import { ClassService } from '../services/Class/ClassService';
import { ClassContext } from '../context/GlobalContext';
import { useAuthHeader } from 'react-auth-kit';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

interface AddMemberProps {
  open: boolean;
  setClose: ()=>void;
  type: string;
}

const AddMember: React.FC<AddMemberProps> = ({ open, setClose, type }) => {
  const {id} = useContext(ClassContext);
  const authHeader = useAuthHeader();
  const [error, setError] = useState<string>();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = authHeader().replace('Bearer ', '');
      console.log(values);
      const res = await ClassService.addMember(values.email, id, type, token );
      handleAxiosReponse(res, {
        ifSuccess: (data) => {
          console.log(data);
          setClose();
        },
        ifFailed: (err) => {
          setError(err.response?.data?.message);
        }
      });
    },
  });

  const onCancel = () => {
    setClose();
    console.log('cancel');
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
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit' variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </form>
      {error && <p>{error}</p>}
    </Dialog>
  );
};

export default AddMember;
