import React from 'react';
import GradeReviewList from '../../components/Grade/GradeReviewList';
import GradeReviewPagination from '../../components/Grade/GradeReviewPagination';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gradeReviewService } from '../../services/gradeReview/GradeReviewService';
import { apiCall } from '../../utils/apiCall';
import { gradeReviewClass } from '../../models/IGradeReview';
import { CircularProgress } from '@mui/material';


const GradeReview = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const location = useLocation();
  const [gradeReviews, setGradeReviews] = React.useState<gradeReviewClass[]>([]);
  const query = new URLSearchParams(location.search);

  const getGradeReview = async () => {
    setIsLoading(true);
    await apiCall(gradeReviewService.getGradeReview(), {
      ifSuccess: (data) => {
        const result = data.metadata as gradeReviewClass[];
        const filterResult = result.filter((item) => item.gradeReviews.length > 0);
        setGradeReviews(filterResult);
      },
      ifFailed: (error) => {
        console.log(error);
      },
    });
    setIsLoading(false);
  };

  React.useEffect(() => {
    getGradeReview();
  }, []);

  const limit = 7;
  const data = gradeReviews.map((item) => {
    const temp = item.gradeReviews.map((gradeReview) => {
      return {
        ...gradeReview,
        className: item.className,
        classId: item.id
      };
    });
    return {
      ...item,
      gradeReviews: temp,
    };
  }).flatMap((item) => item.gradeReviews);

  const page = Number(query.get('page')) || 1;
  const totalPages = Math.ceil(data.length / limit);
  const dataPerPage = data.slice((page - 1) * limit, page * limit);

  return (
    <div className='sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40'>
      <h1 className='text-xl font-semibold text-center mb-3'>{t('gradeReview.title')}</h1>
      { !isLoading &&
        <>
          <GradeReviewList data={dataPerPage}/>
          <GradeReviewPagination totalPages={totalPages} page={page}/>
        </>
      }
      {isLoading &&
        <div className='flex justify-center'>
          <CircularProgress className='w-12 h-12'/>
        </div>
      }
    </div>
  );
};

export default GradeReview;