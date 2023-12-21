import { Button, TextField } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const GradeCommentInput = () => {
  const {t} = useTranslation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center relative w-full md:w-2/3 lg:w-3/5'>
      <TextField
        label={t('gradeComment')}
        variant="outlined"
        multiline
        fullWidth
        margin="normal"
        placeholder= {t('gradeComment.type')}
      />
      <SendIcon fontSize="medium" style={{ verticalAlign: 'middle', color: 'blue',position: 'absolute', right: '10px', transition: 'color 0.3s'}} className='cursor-pointer' />
    </form>
  );
};

export default GradeCommentInput;