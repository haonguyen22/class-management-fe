import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { avatarDefault } from '../../constants/globalConst';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ClassContext } from '../../context/ClassContext';
import { Role } from '../../enums/RoleClass';

interface ClassBannerProps {
  name?: string;
  description?: string;
  avatar?: string;
  backgroundImage?: string;
  onImageBackgroundUpload?: (file?: File) => void;
}

const ClassDetailBanner: React.FC<ClassBannerProps> = ({
  name,
  description,
  avatar,
  backgroundImage,
  onImageBackgroundUpload,
}) => {
  const { t } = useTranslation();

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const { role } = useContext(ClassContext);

  return (
    <div className=" mx-auto relative mt-3">
      <div className="relative rounded-md object-center h-full">
        <div className="w-full h-full rounded-md">
          <img
            src={backgroundImage ?? 'https://picsum.photos/1300/400'}
            alt="banner"
            className="relative w-full h-full min-h-[300px] max-h-[400px] rounded-md"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 rounded-b-md"></div>
      <div className="absolute bottom-0 left-0 right-0 w-full flex items-end justify-between h-24 px-5 pb-5">
        <div className="flex items-center gap-5">
          <div className="flex flex-row items-center justify-between">
            <img
              src={avatar || avatarDefault}
              alt="avatar"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h1 className="text-2xl text-white">
                {name || t('ClassBanner.default')}
              </h1>
              <p className="text-white line-clamp-2 overflow-hidden">
                {description || t('ClassBanner.defaultTitle')}
              </p>
            </div>
          </div>
        </div>
        {role === Role.TEACHER && (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className=" m-5 "
          >
            {t('custom')}
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => onImageBackgroundUpload?.(e.target.files?.[0])}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClassDetailBanner;
