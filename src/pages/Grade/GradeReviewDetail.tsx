import { Avatar, Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Subject as SubjectIcon, Scoreboard, Help } from '@mui/icons-material';
import GradeReviewComment from '../../components/Grade/GradeReviewComment';
import GradeCommentInput from '../../components/Grade/GradeCommentInput';
import { useTranslation } from 'react-i18next';

const GradeReviewDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className='md:mx-0 lg:flex lg:flex-col lg:mx-20 xl:mx-40'>
      <h1 className='text-center text-xl font-semibold mb-3'>{`${t('gradeReviewDetail.title')} ${id}`}</h1>
      <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
        <div className='grid grid-rows-2 gap-3'>
          <div className='flex gap-3 items-center'>
            <Avatar style={{ width: '60px', height: '60px' }}>
              <img src='https://picsum.photos/200/200' alt='student' />
            </Avatar>
            <div className='ml-3 font-semibold'>
              <h1>Nguyễn Văn A</h1>
              <h2>Lớp 1</h2>
            </div>
          </div>
          <div className='border border-gray-300 rounded-md p-3 flex justify-between shadow-md items-center hover:shadow-lg'>
            <TextField
              label={t('gradeReviewDetail.score')}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10, } }}
              variant="outlined"
              className='w-40 min-w-max'
            />
            <div className='flex gap-1 min-w-max ml-3'>
              <Button variant='contained'>{t('gradeReviewDetail.confirm')}</Button>
              <Button variant='contained' color='error' style={{paddingTop: '15px', paddingBottom:'15px' }}>{t('gradeReviewDetail.reject')}</Button>
            </div>
          </div>
        </div>
        <div className='wrap-right grid grid-rows-2 gap-3'>
          <div className='mark flex gap-1 min-w-max'>
            <div className='current-score w-full border border-gray-300 rounded-md flex flex-col items-center justify-center min-w-max shadow-md hover:shadow-lg'>
              <div>
                <Scoreboard fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color: 'red' }} />
                <span className='ml-2 text-lg font-semibold'>{t('gradeReviewDetail.currenScore')} </span>
              </div>
              <span className='font-bold text-lg'>9.5</span>
            </div>
            <div className='new-score w-full border border-gray-300 rounded-md flex flex-col items-center justify-center min-w-max shadow-md hover:shadow-lg'>
              <div>
                <SubjectIcon fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color:'green' }} />
                <span className='ml-2 text-lg font-semibold'>{t('gradeReviewDetail.expectedScore')} </span>
              </div>
              <span className='font-bold text-lg'>9.5</span>
            </div>
          </div>
          <div className='reason p-3 border border-gray-300 rounded-md shadow-md hover:shadow-lg'>
            <div className='flex items-center gap-3'>
              <Help fontSize="medium" style={{ verticalAlign: 'middle', marginLeft: '5px', color: 'blue' }} />
              <span className='text-lg font-semibold'>{t('gradeReviewDetail.explanation')}</span>
            </div>
            <p>Sai điểmjkjkuioasogih asgawleg asg á rgaweg asg asd g asdg á gd asdg á g asg sdaf ád</p>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <div className='font-semibold text-lg py-2'>{t('gradeReviewDetail.commentTitle')}</div>
        <div className='flex flex-col items-center'>
          <GradeReviewComment name="test" comment='check test' time="1-1-2023"/>
          <GradeCommentInput/>
        </div>
      </div>
    </div>
  );
};

export default GradeReviewDetail;