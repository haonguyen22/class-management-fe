import React from 'react';
import { FaUserPlus } from 'react-icons/fa';

interface TypeMemberProps  {
  type?: string;
  memberCount?: number;
}

const TypeMember: React.FC<TypeMemberProps> = ({type, memberCount}) => {
  return (
    <>
      <div className='flex justify-between items-center p-3'>
        <span className='text-2xl font-bold'>{type||'Defaul member'}</span>
        <div className='flex justify-between items-center gap-5'>
          <span className='text-xl'>Học viên: {memberCount}</span>
          <div className="text-4xl cursor-pointer">
            <FaUserPlus></FaUserPlus>
          </div>
        </div>
      </div>
      <hr className='h-0.5 bg-gray-400'/>
    </>
  );
};

export default TypeMember;