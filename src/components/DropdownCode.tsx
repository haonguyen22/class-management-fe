import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DropdownCodeProps {
  code?: string;
};

const DropdownCode: React.FC<DropdownCodeProps> = ({code}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {t} = useTranslation();

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

export default DropdownCode;