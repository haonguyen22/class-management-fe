import React, { useState } from 'react';
import {
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {MoreVert} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface RowWithDropdownProps {
  name?: string;
  isChecked?: boolean;
  setIsChecked?: () => void;
}

const RowUser: React.FC<RowWithDropdownProps> = ({ name, isChecked, setIsChecked }) => {
  // name = name || 'default';
  const [anchorEl, setAnchorEl] = useState(null);
  const {t} = useTranslation();

  const handleMoreClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setAnchorEl(null);
  };

  return (
      <div className="flex items-center mx-5 justify-between hover:bg-blue-100 hover:rounded-md p-2">
        <div className='flex items-center gap-5 cursor-pointer'
          onClick={setIsChecked}
        >
          <Checkbox checked={isChecked}  />
          <Typography className='text-left'>{name||t('RowUser.DefaultName')}</Typography>
        </div>
        <IconButton onClick={handleMoreClick}>
          <MoreVert />
        </IconButton>
        {/* Drop down */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('Option 1')}>
            {t('RowUser.clear')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Option 2')}>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Option 3')}>
            Option 3
          </MenuItem>
        </Menu>
      </div>
  );
};

export default RowUser;
