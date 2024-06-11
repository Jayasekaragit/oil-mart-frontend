import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({userName}) {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen overflow-hidden w-screen'>
        <Sidebar/>
        <div className='flex-1 flex flex-col' >
        <Header userName = {userName} />
        {/* <div className='bg-teal-'>Header</div> */}

        <div className='p-4 flex-1 overflow-y-auto'>{<Outlet/>}</div>
        </div>
        {/* <div>footer</div> */}
    </div> 
  )
}
