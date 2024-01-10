import { Pagination, PaginationItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface GradeReviewPaginationProps {
  totalPages: number;
  page: number;
}

const GradeReviewPagination: React.FC<GradeReviewPaginationProps> = ({totalPages, page}) => {
  return (
    <>
      {totalPages >= 1 &&
        <div className='flex justify-center mt-5'>
          <Pagination
          page={page}
          count={totalPages}
          classes={{ ul: 'flex gap-2'}}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/grade${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
              style={{fontSize: '1rem'}}
            />
          )}/>
        </div>
      }
    </>
  );
};

export default GradeReviewPagination;