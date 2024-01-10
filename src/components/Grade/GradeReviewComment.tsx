import { Avatar } from '@mui/material';
import React from 'react';
import { IComment } from '../../models/IGradeReview';

interface GradeReviewCommentProps {
  comment: IComment;
}


const GradeReviewComment: React.FC<GradeReviewCommentProps> = ({comment}) => {
  return (
    <div className='w-full md:w-2/3 lg:w-3/5'>
      <div className='flex gap-3'>
        <Avatar imgProps={{src: comment.avatar||'https://picsum.photos/200/200'}} />
        <div className='flex flex-col border border-gray-300 w-full px-3 py-0.5 rounded-lg shadow-md'>
          <span className='font-semibold text-base'>{comment.byUser}</span>
          <span>{comment.message}</span>
        </div>
      </div>
      <div className='ml-16 text-sm text-gray-500 mt-0.5'>{new Date(comment.time).toLocaleDateString('vi-VN')}</div>
    </div>
  );
};

export default GradeReviewComment;