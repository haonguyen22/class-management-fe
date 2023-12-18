import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EditMemberButton = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();

  const handleMoreClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (id: string) => {
    console.log(`click: ${id}`);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMoreClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('Option ' + id)}>
          {t('remove')}
        </MenuItem>
      </Menu>
    </>
  );
};


