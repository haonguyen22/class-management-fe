import React from 'react';
import { GradeReviewRowProps } from '../../models/IGrade';
import GradleReviewRow from './GradeReviewRow';

interface GradleReviewListProps {
  data: GradeReviewRowProps[];
}

const GradleReviewList: React.FC<GradleReviewListProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-3'>
      {data.map((row, ind) => (
        <GradleReviewRow
          key={ind}
          id={row.id}
          imgSrc={row.imgSrc}
          message={row.message}
          student={row.student}
          className={row.className}
          checked={row.checked}
        />
      ))}
    </div>
  );
};

export default GradleReviewList;
