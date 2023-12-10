import React from 'react';

const LayoutLarge = ({children}:  { children: React.ReactNode }) => {
  return (
    <div className='sm:mx-3 md:mx-16 mdLg:mx-20 lg:mx-40'>
      {children}
    </div>
  );
};

export default LayoutLarge;