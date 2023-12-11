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
import AddMember from './AddMember';

interface DropdownCodeProps {
  code?: string;
}

const DropdownCode: React.FC<DropdownCodeProps> = ({ code }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('students');

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
        <MenuItem onClick={() => handleCopy(code || 'Defaul code')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('ClassCode.copy')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleCopy(
              `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/class/join?code=${code}`,
            )
          }
        >
          <ListItemIcon>
            <Link fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t('ClassCode.copyUrl')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpen('students')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText> student Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleOpen('teachers')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText> Teacher Email </ListItemText>
        </MenuItem>
      </Menu>
      <AddMember open={open} setClose={handleClose} type={type}></AddMember>
    </div>
  );
};

export default DropdownCode;
