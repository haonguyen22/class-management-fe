import React from 'react';
import { GradeReviewRowProps } from '../../models/IGrade';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GradleReviewRow: React.FC<GradeReviewRowProps> = ({ id, imgSrc, message, student, className, checked}) => {
  const navigate = useNavigate();

  return (
    <ListItem className={`cursor-pointer bg-gray-200 rounded-md shadow-md hover:bg-gray-300 active:transition-all relative ${checked?'':'border-l-4 border-red-500'}`}
      onClick={()=>navigate(`/gradle/${id}`)}
    >
      <div className='flex items-center w-full'>
        <ListItemAvatar>
          <Avatar>
            <img src={imgSrc||'https://picsum.photos/200/200'} alt={student} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className='md:flex' primary={
          <Typography className='line-clamp-1 md:w-1/3'>
            {`${className} - ${student}`}
          </Typography>
        } secondary={
          <Typography className='line-clamp-1 text-gray-500'>
            {message}
          </Typography>
        } />
      </div>
      <span className='min-w-max'> 1-1-2021 </span>

    </ListItem>
  );
};

export default GradleReviewRow;