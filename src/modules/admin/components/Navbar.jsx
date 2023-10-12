import React ,{useState} from 'react';
import Bread from './Breadcrumbs';
import SearchInput from './SearchInput';
import { UserCircleIcon, BellIcon, Bars3Icon, Bars3CenterLeftIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { 
  // open,
  // close ,
  toggle } from '../../../Redux/StateReducer';
function Navbar({ 
  // onSidebarToggle 
}) {
  // const openSideBar=useSelector((state)=>{
  //   return
  // });
  // const dispach=useDispatch();
  
  const isOpen=useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div className='bg-blue-gray-50/[0.9]  sticky bg-blend-lighten top-1 z-10  rounded flex justify-between  '>
      
      <div className=''>
        <Bread />
        <h1 className='ml-4'>profile</h1>
      </div>

      
      <div className='md:flex p-4 '>
        <SearchInput />
        <div className='flex'> 
        {isOpen ?<Bars3Icon
            className="m-2 h-6 w-6 lg:hidden cursor-pointer"
            onClick={() => dispatch(toggle())}
          />:<Bars3CenterLeftIcon onClick={() => dispatch(toggle())} className="m-2 h-6 w-6 lg:hidden cursor-pointer" />}
          
        <UserCircleIcon className='m-2 h-6 w-6 ' />
        <BellIcon className='m-2 h-6 w-6' />
        </div>
      </div>
    </div>
  );
}

export default Navbar;