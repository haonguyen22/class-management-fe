import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAdd from '@mui/icons-material/PersonAdd';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  const LabelButton = [
    {
      title: t('edit'),
      icon: <EditIcon fontSize="small" />,
      onClick: () => {},
    },
    {
      title: t('erase'),
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => {},
    },
    {
      title: t('returnAll'),
      icon: <PersonAdd fontSize="small" />,
      onClick: () => {},
    },
    {
      title: t('downloadGradeTemplate'),
      icon: <DownloadIcon fontSize="small" />,
      onClick: () => {},
    },
    {
      title: t('uploadGrade'),
      icon: <UploadIcon fontSize="small" />,
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="flex flex-col  mx-4">
        <div
          className="flex items-center justify-between pb-1"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <span>{name}</span>
          <div
            onClick={handleClick}
            className={`${
              !isHover && !anchorEl && 'invisible'
            } + hover:cursor-pointer`}
          >
            <MoreVertIcon className="w-6 h-6 text-black font-bold hover:cursor-pointer" />
          </div>
        </div>
        <hr className="h-[1.5px] w-full  bg-gray-300" />
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
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {LabelButton.map((option) => (
          <MenuItem
            key={option.title}
            onClick={() => {
              setIsHover(false);
              option.onClick();
              handleClose();
            }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default GradeHeaderDropdown;
