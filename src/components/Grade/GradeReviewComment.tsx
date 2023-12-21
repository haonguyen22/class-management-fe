import { Avatar } from '@mui/material';
import React from 'react';

const GradeReviewComment = () => {
  return (
    <div className='w-full md:w-2/3 lg:w-3/5'>
      <div className='flex gap-3'>
        <Avatar imgProps={{src: 'https://picsum.photos/200/200'}} />
        <div className='flex flex-col bg-gray-100 w-full px-3 py-0.5 rounded-lg'>
          <span className='font-semibold text-base'>name</span>
          <span>comment</span>
        </div>
      </div>
      <div className='ml-16 text-sm text-gray-500 mt-0.5'>1-1-2023</div>
    </div>
  );
};

export default GradeReviewComment;