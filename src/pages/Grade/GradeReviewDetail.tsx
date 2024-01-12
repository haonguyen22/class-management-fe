import { Avatar, Button, CircularProgress, TextField, TextareaAutosize } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Subject as SubjectIcon, Scoreboard, Help } from '@mui/icons-material';
import GradeCommentInput from '../../components/Grade/GradeCommentInput';
import { useTranslation } from 'react-i18next';
import { apiCall } from '../../utils/apiCall';
import { gradeReviewService } from '../../services/gradeReview/GradeReviewService';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IComment, IGradeComposition, IGradeReview } from '../../models/IGradeReview';
import GradeCommentList from '../../components/Grade/GradeCommentList';
import { useSnackbar } from 'notistack';
import { Role } from '../../enums/RoleClass';
import { authService } from '../../services/auth/AuthService';
import { IUser } from '../../models/User';
import { gradeManagementService } from '../../services/gradeManagement/GradeManagementService';



const GradeReviewDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gradeReview, setGradeReview] = useState<IGradeReview>();
  const [commentData, setCommentData] = useState<IComment[]>([]);
  const [gradeComposition, setGradeComposition] = useState<IGradeComposition>(); // [
  const [user, setUser] = useState<IUser>();

  const { t } = useTranslation();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const getGradeReviewDetail = async (gradeReviewId: number) => {
    setIsLoading(true);
    await apiCall(gradeReviewService.getGradeReviewDetail(gradeReviewId), {
      ifSuccess: (data) => {
        const {gradeReview, comments, gradeComposition} = data.metadata as {gradeReview: IGradeReview, comments: IComment[], gradeComposition: IGradeComposition};
        formikScore.setFieldValue('value', gradeReview.currentGrade);
        gradeReview && setGradeReview(gradeReview);
        comments.length>0 && setCommentData(comments);
        gradeComposition && setGradeComposition(gradeComposition);
      },
      ifFailed: (error) => {
        console.log(error);
      }
    });
    setIsLoading(false);
  };

  const handleApproveReject = async (isApprove: boolean, value: number) => {
    await apiCall(gradeReviewService.reviewGradeReview(parseInt(id!),
      {
        id: parseInt(id!),
        value,
        isApprove: isApprove,
      }
    ), {
      ifSuccess: (data) => {
        console.log(data);
        enqueueSnackbar(data.message, {variant: 'success'});
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, {variant: 'error'});
      }
    });
  };

  const getUser = async () => {
    await apiCall(authService.getProfile(), {
      ifSuccess: (data) => {
        setUser(data.metadata as IUser);
      },
      ifFailed: (error) => {
        console.log(error);
      }
    });
  };

  const validationScore = yup.object({
    value: yup.number().min(0).required(),
  });

  const formikScore = useFormik({
    initialValues: {
      value: gradeReview?.currentGrade ||0,
    },
    validationSchema: validationScore,
    onSubmit: async (values) => {
      await handleApproveReject(true, values.value);
    },
  });


  useEffect(() => {
    getUser();
    getGradeReviewDetail(parseInt(id!));
  }, [id]);


  return (
    <>
      {isLoading &&
        <div className='flex justify-center items-center'>
          <CircularProgress className='w-20 h-20' />
        </div>
      }
      {!isLoading && gradeReview &&
        <div className='md:mx-0 lg:flex lg:flex-col lg:mx-20 xl:mx-40'>
          <h1 className='text-center text-xl font-semibold mb-3'>{`${t('gradeReviewDetail.title')} ${id}`}</h1>
          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
            <div className='grid grid-rows-2 gap-3'>
              <div className='flex gap-3 items-center'>
                <Avatar style={{ width: '60px', height: '60px' }}>
                  <img src={ 'https://picsum.photos/200/200'} alt='student' />
                </Avatar>
                <div className='ml-3 font-semibold'>
                  <h1>{gradeReview.studentId}</h1>
                  {/* className */}
                  <h2>{}</h2>
                </div>
              </div>
              <div className='border border-gray-300 rounded-md p-3 flex justify-between shadow-md items-center hover:shadow-lg'>
                <form onSubmit={formikScore.handleSubmit} className='flex gap-3 items-center'>
                {/*  */}
                  <TextField
                    id='value'
                    name='value'
                    label={t('gradeReviewDetail.score')}
                    variant='outlined'
                    size='small'
                    type='number'
                    value={formikScore.values.value}
                    onChange={formikScore.handleChange}
                    error={formikScore.touched.value && Boolean(formikScore.errors.value)}
                    helperText={formikScore.touched.value && formikScore.errors.value}
                  />
                  { user?.studentId !== gradeReview.studentId &&
                    <div className='flex gap-1 min-w-max ml-3'>
                      <Button variant='contained' type='submit'>
                        {t('gradeReviewDetail.confirm')}
                      </Button>
                      <Button variant='contained' color='error' style={{paddingTop: '15px', paddingBottom:'15px' }}
                        onClick={()=>
                          handleApproveReject(false,gradeReview?.value||0)
                        }>
                        {t('gradeReviewDetail.reject')}
                      </Button>
                    </div>
                  }
                </form>
              </div>
            </div>
            <div className='wrap-right grid grid-rows-2 gap-3'>
              <div className='mark flex gap-1 min-w-max'>
                <div className='current-score w-full border border-gray-300 rounded-md flex flex-col items-center justify-center min-w-max shadow-md hover:shadow-lg px-3'>
                  <div>
                    <Scoreboard fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color: 'red' }} />
                    <span className='ml-2 text-lg font-semibold'>
                      {t('gradeReviewDetail.composition')}
                    </span>
                  </div>
                  <span className='font-bold text-lg'>{gradeComposition?.weight} %</span>
                </div>
                <div className='current-score w-full border border-gray-300 rounded-md flex flex-col items-center justify-center min-w-max shadow-md hover:shadow-lg px-3'>
                  <div>
                    <Scoreboard fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color: 'red' }} />
                    <span className='ml-2 text-lg font-semibold'>
                      {t('gradeReviewDetail.currenScore')}
                    </span>
                  </div>
                  <span className='font-bold text-lg'>{gradeReview.value}</span>
                </div>
                <div className='new-score w-full border border-gray-300 rounded-md flex flex-col items-center justify-center min-w-max shadow-md hover:shadow-lg px-3'>
                  <div>
                    <SubjectIcon fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color:'green' }} />
                    <span className='ml-2 text-lg font-semibold'>
                      {t('gradeReviewDetail.expectedScore')}
                    </span>
                  </div>
                  <span className='font-bold text-lg'>{gradeReview.expectedValue}</span>
                </div>
              </div>
              <div className='reason p-3 border border-gray-300 rounded-md shadow-md hover:shadow-lg'>
                <div className='flex items-center gap-3'>
                  <Help fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color: 'blue' }} />
                  <span className='text-lg font-semibold'>{t('gradeReviewDetail.explanation')}</span>
                </div>
                <TextareaAutosize style={{resize: 'none'}} minRows={2} maxRows={3} className='w-full border border-gray-300 rounded-md p-2 mt-2' value={gradeReview.message}
                 />
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='font-semibold text-lg py-2'>{t('gradeReviewDetail.commentTitle')}</div>
            <div className='flex flex-col items-center'>
              <GradeCommentList comments={commentData}/>
              <GradeCommentInput setCommentData={setCommentData}/>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default GradeReviewDetail;