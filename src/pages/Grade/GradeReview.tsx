import React from 'react';
import GradeReviewList from '../../components/Grade/GradeReviewList';
import GradeReviewPagination from '../../components/Grade/GradeReviewPagination';
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
    checked: true,
    time: '1-1-2021'
  },
  {
    id: 2,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2021'
  },
  {
    id: 3,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false,
    time: '1-1-2023'
  },
  {

    id: 4,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false,
    time: '1-1-2023'
  },
  {
    id: 5,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 6,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 7,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'

  },
  {
    id: 8,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 9,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 10,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 11,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 12,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 13,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 14,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 15,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 16,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 17,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 18,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 19,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: true,
    time: '1-1-2023'
  },
  {
    id: 20,
    className: 'Lớp 1',
    imgSrc: 'https://mui.com/static/images/avatar/1.jpg',
    message: 'phúc khảo điểm toán',
    student: 'Nguyễn Văn A',
    checked: false,
    time: '1-1-2023'
  },

];


const GradeReview = () => {
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
      <GradeReviewList data={data}/>
      <GradeReviewPagination totalPages={Math.ceil(sortData.length / 7)} page={page}/>
    </div>
  );
};

export default GradeReview;