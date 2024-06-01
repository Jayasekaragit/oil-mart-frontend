import React from 'react'
import { FcDataSheet } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/NavigationCashier';
import { Link, useLocation } from 'react-router-dom';
const linkClasses = 'flex items-center gap-2 py-2 px-3 hover:bg-neutral-700 hover:no-underline rounded-sm active:bg-neutral-600 text-base'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi';

export default function CashierSideBar() {
  return (
    <div className='flex flex-col text-white bg-neutral-900 w-60 p-3'>
      <div className='flex items-center gap-2 py-2 px-2'>
        <FcDataSheet  fontSize={24}/>
        <span className='text-neutral-100 text-lg py-3 px-2'>Oil Mart</span>
      </div>
      <div className='flex-1 text-white flex-col text-lg gap-0.5' >
        {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
          <SidebarLink key={item.key} item={item}/>
        ))}
      </div>
      <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item=>(
          <SidebarLink key={item.key} item={item}/>
        ))}
        <div className={classNames('text-red-500 cursor-pointer',linkClasses)}>
          <span className='text-xl'>
            <HiOutlineLogout/>
          </span>
          Logout
        </div>

      </div>
    </div>
  )
}

function SidebarLink({ item }){
  const {pathname} = useLocation() 

  return (
    <Link to={item.path} className={classNames(pathname=== item.path ?'bg-neutral-700':'text-neutral-400',linkClasses)}>
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  )
}