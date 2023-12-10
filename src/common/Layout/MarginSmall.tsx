import React from 'react';

const LayoutSmall = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='mx-5'>
      {children}
    </div>
  );
};

export default LayoutSmall;