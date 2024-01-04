import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LabelButton = ['Edit', 'Erase', 'Return all'];

interface IGradeHeaderDropdown {
  name: string;
  totalMark?: number;
  gradeCategory?: string;
}

const GradeHeaderDropdown: React.FC<IGradeHeaderDropdown> = ({
  name,
  totalMark,
  gradeCategory,
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
      <div className="flex flex-col  mx-4">
        <div
          className="flex items-center justify-between pb-1"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <span>{name}</span>
          <div
            onClick={handleClick}
            className={`${!isHover && !anchorEl && 'invisible'}`}
          >
            <MoreVertIcon className="w-6 h-6 text-black font-bold" />
          </div>
        </div>
        <hr className='h-[1.5px] w-full  bg-gray-300' />
        {gradeCategory && (
          <div className="h-5 py-2 text-left text-xs text-gray-500 font-thin">
            {gradeCategory}
          </div>
        )}
        <div className="h-5 py-2  text-left text-xs text-gray-500  font-thin">
          {totalMark && `out of ${totalMark}`}
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
        {LabelButton.map((option: string) => (
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

export default GradeHeaderDropdown;
