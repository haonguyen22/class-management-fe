import React from 'react';
import Button from '@mui/material/Button';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreateHomeworkButton = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('create');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick} >
        <BsPlus className="w-6 h-6 text-white font-bold" />
        <span className="ml-2">{t('create')}</span>
      </Button>
    </div>
  );
};

export default CreateHomeworkButton;