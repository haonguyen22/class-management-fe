import React from 'react';
import { IComment } from '../../models/IGradeReview';
import GradeReviewComment from './GradeReviewComment';

interface IGradeCommentListProps {
  comments: IComment[];
}

const GradeCommentList: React.FC<IGradeCommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.length > 0 && comments.map((comment, ind) => (
        <GradeReviewComment key={ind} comment={comment}/>
      ))}
    </>
  );
};

export default GradeCommentList;