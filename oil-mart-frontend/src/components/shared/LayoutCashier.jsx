import React from 'react'
import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
import Header from './Header'
import CashierSideBar from '../Cashier/CashierSideBar'

export default function Layout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen overflow-hidden w-screen'>
        <CashierSideBar/>
        <div className='flex-1' >
        <Header/>
        {/* <div className='bg-teal-'>Header</div> */}

        <div className='p-4'>{<Outlet/>}</div>
        </div>
        {/* <div>footer</div> */}
    </div> 
  )
}
