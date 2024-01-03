import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { apiCall } from '../../utils/apiCall';
import { useParams } from 'react-router-dom';
import { classService } from '../../services/class/ClassService';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { Role } from '../../enums/RoleClass';

interface AddMemberProps {
  open: boolean;
  setClose: () => void;
  type: string;
}

const AddMemberDialog: React.FC<AddMemberProps> = ({
  open,
  setClose,
  type,
}) => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email(t('email.invalid')).required(t('email.required')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const typeTemp = type === Role.TEACHER ? Role.TEACHER : Role.STUDENT;
      await apiCall(classService.addMember(values.email, id, typeTemp + 's'), {
        ifSuccess: (data) => {
          enqueueSnackbar(data.message, { variant: 'success' });
          setClose();
        },
        ifFailed: (err) => {
          setError(err.response?.data?.message);
        },
      });
      setIsLoading(false);
    },
  });

  const onCancel = () => {
    formik.resetForm();
    setError(undefined);
    setClose();
  };

  const onAdd = () => {
    formik.handleSubmit();
  };

  return (
    <Dialog onClose={onCancel} open={open} classes={{ paper: 'w-full' }}>
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
      {error && <DialogContent className="text-red-500">{error}</DialogContent>}

      <DialogActions>
        <Button onClick={onCancel} color="info">
          {t('cancel')}
        </Button>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={onAdd} color="success">
            {t('add')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
