import React from 'react';
import { GradeReviewRowProps } from '../../models/IGrade';
import GradeReviewRow from './GradeReviewRow';
import { GradeReviewItem } from '../../models/IGradeReview';

interface GradeReviewListProps {
  data: GradeReviewItem[];
}

const GradeReviewList: React.FC<GradeReviewListProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-3'>
      {
        data.map((item, ind) => (
          <GradeReviewRow
            key={ind}
            id={item.id}
            imgSrc={item.avatar}
            message={item.message}
            student={item.studentId}
            className={item.className}
            checked={false}
            time={new Date(item.time).toLocaleDateString()}
          />
        ))
      }
    </div>
  );
};

export default GradeReviewList;
