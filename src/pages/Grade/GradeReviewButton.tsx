import React, { useState } from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { apiCall } from '../../utils/apiCall';
import { gradeReviewService } from '../../services/gradeReview/GradeReviewService';
import { useSnackbar } from 'notistack';

interface IGradeReviewButton {
  value: unknown;
  assignmentId: number;
  classId: number;
  assignmentName?: string;
  maxScore?: number;
}

const GradeReviewButton: React.FC<IGradeReviewButton> = ({value, maxScore, assignmentId,classId, assignmentName}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    expectedValue: Yup.number().required('Expected score is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      expectedValue: '',
      message: '',
      assignmentId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await apiCall(gradeReviewService.createGradeReview(classId, values), {
        ifSuccess: (data) => {
          enqueueSnackbar(data.message, {
            variant: 'success',
          });
        },
        ifFailed: (error) => {
          enqueueSnackbar(error.message, {
            variant: 'error',
          });
        },
      });
      setIsLoading(false);
      handleClose();
    },
  });

  return (
    <div className='p-4'>
      <div onClick={handleClickOpen} className='flex items-center justify-center'>
        <span>{`${value}/${maxScore}`}</span>
        <RateReviewIcon className='w-24 h-24'/>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
          {'Request review'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3 items-center'>
                <div className='w-40'>{t('gradeReview.AssignmentLabel')}</div>
                <div className='flex flex-col gap-3'>
                  <TextField
                    label = {t('assignment')}
                    margin='normal'
                    variant='outlined'
                    name='assignmentId'
                    value={assignmentName}
                    disabled
                  />
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-40'>{t('gradeReview.ExpectedValueLabel')}</div>
                <div className='flex flex-col gap-3'>
                  <TextField
                    label = {t('expectedValue')}
                    type='number'
                    margin='normal'
                    variant='outlined'
                    name='expectedValue'
                    disabled={isLoading}
                    value={formik.values.expectedValue}
                    onChange={formik.handleChange}
                    />
                  {formik.touched.expectedValue && formik.errors.expectedValue && (
                    <div className="text-red-500">{formik.errors.expectedValue}</div>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <span>{t('gradeReview.messageLabel')}</span>
                <TextareaAutosize
                  className='border rounded-md p-2 outline-none focus:ring-[1.5px] focus:shadow-none focus:ring-blue-600'
                  placeholder={'nhập message'}
                  maxRows={5}
                  minRows={5}
                  name='message'
                  disabled={isLoading}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                {formik.touched.message && formik.errors.message && (
                  <div className="text-red-500">{formik.errors.message}</div>
                )}
              </div>
            </div>
            <DialogActions>
              <Button onClick={handleClose} color='primary' variant='outlined' >
                Cancel
              </Button>
              <Button type="submit" autoFocus variant='contained' color="primary" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradeReviewButton;