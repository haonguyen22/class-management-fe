import React from 'react';
import { GradeReviewRowProps } from '../../models/IGrade';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GradeReviewRow: React.FC<GradeReviewRowProps> = ({ id, imgSrc, message, student, className, checked, time}) => {
  const navigate = useNavigate();

  return (
    <ListItem className={`cursor-pointer border border-gray-300 rounded-md shadow-md hover:shadow-lg active:transition-all relative ${checked?'ml-1':'border-l-4 border-l-red-500'}`}
      onClick={()=>navigate(`/grade/${id}`)}
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
      <span className='min-w-max'>{time}</span>
    </ListItem>
  );
};

export default GradeReviewRow;