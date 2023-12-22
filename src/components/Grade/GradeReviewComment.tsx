import { Avatar } from '@mui/material';
import React from 'react';

interface GradeReviewCommentProps {
  name: string;
  comment: string;
  time: string;
}

const GradeReviewComment: React.FC<GradeReviewCommentProps> = ({name, comment, time}) => {
  return (
    <div className='w-full md:w-2/3 lg:w-3/5'>
      <div className='flex gap-3'>
        <Avatar imgProps={{src: 'https://picsum.photos/200/200'}} />
        <div className='flex flex-col border border-gray-300 w-full px-3 py-0.5 rounded-lg shadow-md'>
          <span className='font-semibold text-base'>{name}</span>
          <span>{comment}</span>
        </div>
      </div>
      <div className='ml-16 text-sm text-gray-500 mt-0.5'>{time}</div>
    </div>
  );
};

export default GradeReviewComment;