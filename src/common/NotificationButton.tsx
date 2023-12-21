import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const NotificationButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className='text-gray-800 dark:text-white  font-medium rounded-lg text-sm mr-2 ml-3 dark:hover:text-gray-300 focus:outline-none cursor-pointer'
      onClick={()=>navigate('/grade')}
    >
      <NotificationsIcon />
    </div>
  );
};

export default NotificationButton;