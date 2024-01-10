import { Button, CircularProgress, TextField } from '@mui/material';
import React, { SetStateAction } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { apiCall } from '../../utils/apiCall';
import { gradeReviewService } from '../../services/gradeReview/GradeReviewService';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { IComment, IGradeReview } from '../../models/IGradeReview';
import { useAuthUser } from 'react-auth-kit';
import { authService } from '../../services/auth/AuthService';
import { IUser } from '../../models/User';

interface IGradeCommentInputProps {
  setCommentData: React.Dispatch<SetStateAction<IComment[]>>;
}

const GradeCommentInput: React.FC<IGradeCommentInputProps> = ({setCommentData}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser>();
  const {enqueueSnackbar} = useSnackbar();

  const {t} = useTranslation();
  const {id} = useParams<{id: string}>();

  const getUser = async () => {
    await apiCall(authService.getProfile(), {
      ifSuccess: (data) => {
        setUser(data.metadata as IUser);
      },
      ifFailed: (error) => {
        console.log(error);
      },
    });
  };

  const validationComment = yup.object({
    message: yup.string().required(),
  });

  const formikComment = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: validationComment,
    onSubmit: async (values) => {
      setIsLoading(true);
      await apiCall(gradeReviewService.createComment(parseInt(id!),values), {
        ifSuccess: async (data) => {
          await getUser();
          setCommentData((prev) =>
            [...prev,
              {
                ...values,
                gradeReviewId: parseInt(id!),
                time: new Date(),
                avatar: user?.address,
                byUser: user?.name || '',
              },
            ]
          );
          formikComment.resetForm();
          enqueueSnackbar(data.message, {variant: 'success'});
        },
        ifFailed: (error) => {
          console.log(error);
          enqueueSnackbar(error.message, {variant: 'error'});
        },
      });
      setIsLoading(false);
    },
  });


  return (
    <form onSubmit={formikComment.handleSubmit} className='flex items-center relative w-full md:w-2/3 lg:w-3/5'>
      <TextField
        label={t('gradeComment')}
        variant="outlined"
        multiline
        fullWidth
        margin="normal"
        placeholder= {t('gradeComment.type')}
        name="message"
        value={formikComment.values.message}
        onChange={formikComment.handleChange}
        error={formikComment.touched.message && Boolean(formikComment.errors.message)}
        helperText={formikComment.touched.message && formikComment.errors.message}
      />
      <Button type='submit' style={{ verticalAlign: 'middle', color: 'blue',position: 'absolute', right: '0px', transition: 'color 0.3s'}}>
        {isLoading && <CircularProgress size={20} className='mr-2' />}
        {!isLoading &&
          <SendIcon fontSize="medium" style={{ verticalAlign: 'middle'}} className='cursor-pointer'/>
        }
      </Button>
    </form>
  );
};

export default GradeCommentInput;