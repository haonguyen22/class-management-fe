import React from 'react';
import Button from '@mui/material/Button';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CreateHomeworkButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('create');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick} >
        <BsPlus className="w-6 h-6 text-white font-bold" />
        <span className="ml-2">Create</span>
      </Button>
    </div>
  );
};

export default CreateHomeworkButton;