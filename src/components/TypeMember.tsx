import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserPlus } from 'react-icons/fa';

interface TypeMemberProps  {
  type?: string;
  memberCount?: number;
  onclick?: ()=>void;
}

const TypeMember: React.FC<TypeMemberProps> = ({type, memberCount, onclick}) => {
  const {t} = useTranslation();
  return (
    <>
      <div className='flex justify-between items-center p-3 text-blue-700'>
        <span className='text-2xl font-bold'>{type||'Defaul member'}</span>
        <div className='flex justify-between items-center gap-5'>
          <span className='text-sm'>{`${memberCount} ${t('TypeMember.type')}`}</span>
          <div className="text-3xl cursor-pointer"
            onClick={onclick}
          >
            <FaUserPlus></FaUserPlus>
          </div>
        </div>
      </div>
      <hr className='h-0.5 bg-blue-700 mb-3'/>
    </>
  );
};

export default TypeMember;