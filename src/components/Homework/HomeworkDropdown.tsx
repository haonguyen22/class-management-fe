import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';

interface IHomeworkDropProps {
  options: Array<string>;
  label: string;
  children: React.ReactNode;
}

const HomeworkDropdown: React.FC<IHomeworkDropProps> = ({
  options,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isHover, setIsHover] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHover(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHover = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between pb-1"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {children}
        <div
          onClick={handleClick}
          className={`${!isHover && !anchorEl && 'invisible'}`}
        >
          <MoreVertIcon className="w-6 h-6 text-black font-bold" />
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((option: string) => (
          <MenuItem
            key={option}
            onClick={() => {
              setIsHover(false);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HomeworkDropdown;
