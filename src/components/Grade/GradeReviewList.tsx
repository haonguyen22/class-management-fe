import React from 'react';
import { GradeReviewRowProps } from '../../models/IGrade';
import GradeReviewRow from './GradeReviewRow';

interface GradeReviewListProps {
  data: GradeReviewRowProps[];
}

const GradeReviewList: React.FC<GradeReviewListProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-3'>
      {data.map((row, ind) => (
        <GradeReviewRow
          key={ind}
          id={row.id}
          time={row.time}
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

export default GradeReviewList;
