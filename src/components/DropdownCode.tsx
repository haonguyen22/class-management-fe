import { ContentCopy, MoreVert, Link } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DropdownCodeProps {
  code?: string;
}

const DropdownCode: React.FC<DropdownCodeProps> = ({ code }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const handleMoreClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
      })
      .catch((err) => {
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
        <MenuItem onClick={() => handleCopy(code || 'Defaul code')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('ClassCode.copy')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleCopy(
              `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/class/join`,
            )
          }
        >
          <ListItemIcon>
            <Link fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('ClassCode.copyUrl')}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownCode;
