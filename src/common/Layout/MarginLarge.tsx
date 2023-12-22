import React from 'react';

const LayoutLarge = ({children}:  { children: React.ReactNode }) => {
  return (
    <div className='mx-3 md:mx-12 mdLg:mx-20 lg:mx-52'>
      {children}
    </div>
  );
};

export default LayoutLarge;