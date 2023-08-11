import React from 'react'
import Sidebar from './Sidebar'


const ManagementLayout = ({children}) => {
  return (
    <div className="grid grid-cols-7 gap-0 h-screen overflow-y-hidden">
      <div className='col-span-1'>
      <Sidebar />
      </div>
      <div className='col-span-6 w-full overflow-y-auto'>{children}</div>
    </div>
  );
};

export default ManagementLayout;

