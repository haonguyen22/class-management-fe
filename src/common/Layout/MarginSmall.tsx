import React from 'react';

const LayoutSmall = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='mx-3'>
      {children}
    </div>
  );
};

export default LayoutSmall;