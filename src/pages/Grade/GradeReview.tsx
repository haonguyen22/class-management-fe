import React from 'react';
import GradleReviewList from '../../components/Grade/GradeReviewList';
import GradleReviewPagination from '../../components/Grade/GradeReviewPagination';
import { useLocation } from 'react-router-dom';
import { GradeReviewRowProps } from '../../models/IGrade';
import { useTranslation } from 'react-i18next';


const reviewList: GradeReviewRowProps[] =  [
  {
    id: 1,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A adsgasdg adgasgas awgawgawgaw',
    checked: true
  },
  {
    id: 2,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true
  },
  {
    id: 3,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {

    id: 4,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 5,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 6,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 7,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false

  },
  {
    id: 8,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 9,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 10,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 11,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 12,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 13,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 14,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 15,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 16,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 17,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 18,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 19,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },
  {
    id: 20,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false
  },

];


const GradleReview = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sortData = reviewList.sort((a, b) => {
    if (a.checked && !b.checked) return 1;
    if (!a.checked && b.checked) return -1;
    return 0;
  });
  const page = parseInt(query.get('page') || '1', 10);
  const data = sortData.slice((page - 1) * 7, page * 7);

  return (
    <div className='sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40'>
      <h1 className='text-xl font-semibold text-center mb-3'>{t('gradeReview.title')}</h1>
      <GradleReviewList data={data}/>
      <GradleReviewPagination totalPages={Math.ceil(sortData.length / 7)} page={page}/>
    </div>
  );
};

export default GradleReview;