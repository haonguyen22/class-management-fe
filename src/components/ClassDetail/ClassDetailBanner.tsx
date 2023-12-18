import React from 'react';
import { useTranslation } from 'react-i18next';
import { avatarDefault } from '../../constants/globalConst';

interface ClassBannerProps {
  name?: string;
  description?: string;
  avatar?: string;
}

const ClassDetailBanner: React.FC<ClassBannerProps> = ({
  name,
  description,
  avatar,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto relative mt-3">
      <div className="rounded-md object-center h-full min-h-[400px]">
        <img
          src="https://picsum.photos/1300/400"
          alt="banner"
          className="w-full h-full min-h-[400px] rounded-md"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 rounded-b-md"></div>
      <div className="absolute bottom-0 left-0 right-0 flex items-end h-24 px-5 pb-5">
        <div className="flex items-center gap-5">
          <img
            src={avatar || avatarDefault}
            alt="avatar"
            className="w-24 h-24 rounded-full"
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
    </div>
  );
};

export default ClassDetailBanner;