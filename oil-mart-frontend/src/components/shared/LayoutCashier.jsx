import React from 'react'
import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
import Header from './Header'
import CashierSideBar from '../Cashier/CashierSideBar'

export default function Layout({userName}) {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen overflow-hidden w-screen '>
    <CashierSideBar/>
    <div className='flex-1 flex flex-col'>
      <Header/>
      <div className='p-4 flex-1 overflow-y-auto'>{<Outlet userName={userName}/>}</div>
    </div>
    {/* <div>footer</div> */}
  </div>  
  )
}
