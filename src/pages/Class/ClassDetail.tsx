import React from 'react';
import ClassBanner from '../../components/ClassBanner';
import ClassCode from '../../components/ClassCode';

const ClassDetail = () => {
  return (
    <>
      <ClassBanner></ClassBanner>
      <div className='mt-3'>
        <ClassCode></ClassCode>
      </div>
    </>
  );
};

export default ClassDetail;