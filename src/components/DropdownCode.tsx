import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddMember from './AddMember';

interface DropdownCodeProps {
  code?: string;
};

const DropdownCode: React.FC<DropdownCodeProps> = ({code}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('students');

  const handleMoreClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (code: string) => {
    console.log(`Selected option: ${code}`);
    navigator.clipboard.writeText(code)
      .then(() => {
        console.log('Text copied to clipboard:', code);
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard', err);
      });
    setAnchorEl(null);
  };

  const handleOpen = (typeMember: string) => {
    setType(typeMember);
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleMoreClick}>
        <MoreVert />
      </IconButton>
      {/* Drop down */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick(code||'Defaul code')}>
          {t('ClassCode.copy')}
        </MenuItem>
        <MenuItem onClick={() => handleOpen('teachers')}>
          {t('inviteMember.Teacher')}
        </MenuItem>
        <MenuItem onClick={() => handleOpen('students')}>
          {t('inviteMember.Student')}
        </MenuItem>
      </Menu>
      <AddMember open={open} setClose={handleClose} type={type}></AddMember>
    </div>
  );
};

export default DropdownCode;