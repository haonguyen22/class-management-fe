import React from 'react';
import DropdownCode from './DropdownCode';

interface ClassCodeProps  {
  code?: string;
}


const ClassCode: React.FC<ClassCodeProps> = ({code}) => {
  return (
    <div className='inline-block w-60 border border-gray-500 shadow-md rounded-md p-3'>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-lg font-bold">Mã lớp học</h1>
        <DropdownCode></DropdownCode>
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text-xl font-bold text-blue-500">{code||'Default Code'}</h1>
      </div>
    </div>
  );
};

export default ClassCode;