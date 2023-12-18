import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ActionStudentButton = ({ visible }: { visible: boolean }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <div>
      <>
        <Button
          onClick={handleMoreClick}
          style={{
            border: visible ? 'solid gray 1px' : 'solid 1px blue',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          disabled={visible}
        >
          {t('ActionDrop.Action')}
        </Button>
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
    </div>
  );
};

export default ActionStudentButton;
