import React from 'react';
import DropdownCode from './DropdownCode';
import { useTranslation } from 'react-i18next';

interface ClassCodeProps  {
  code?: string;
}


const ClassCode: React.FC<ClassCodeProps> = ({code}) => {
  const {t} = useTranslation();
  return (
    <div className='inline-block w-60 border border-gray-500 shadow-md rounded-md p-3'>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-lg font-bold">{t('ClassCode.title')}</h1>
        <DropdownCode></DropdownCode>
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-xl font-bold text-blue-500">{code||t('ClassCode.code')}</h1>
      </div>
    </div>
  );
};

export default ClassCode;