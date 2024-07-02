import React from 'react';

const layout = ({children}: any) => { //TODO Do not use any here as a type
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-[#106E60]'>
      {children}
    </div>
  );
};

export default layout;