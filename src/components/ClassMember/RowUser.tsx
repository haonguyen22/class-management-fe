import React, { useState } from 'react';
import {
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface RowWithDropdownProps {
  name?: string;
  isChecked?: boolean;
  setIsChecked?: () => void;
  visible?: boolean;
}

export const RowUser: React.FC<RowWithDropdownProps> = ({
  name,
  isChecked,
  setIsChecked,
  visible = true,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

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

  const handleClicked = () => {
    if (visible) setIsChecked!();
  };

  return (
    <>
      <div
        className={`flex items-center mx-5 justify-between ${
          visible ? 'hover:bg-blue-100 hover:rounded-md cursor-pointer' : ''
        } p-2`}
      >
        <div className="flex items-center gap-5 w-full" onClick={handleClicked}>
          <div className={visible ? 'visible' : 'hidden'}>
            <Checkbox checked={isChecked} />
          </div>
          <div className="w-10 h-10 rounded-full">
            <img
              src="https://picsum.photos/200"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <Typography style={{ fontWeight: 'bold' }}>
            {name || t('RowUser.DefaultName')}
          </Typography>
        </div>
        <IconButton onClick={handleMoreClick}>
          <MoreVert />
        </IconButton>
        {/* Drop down */}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('Option 1')}>
          {t('remove')}
        </MenuItem>
      </Menu>
    </>
  );
};
