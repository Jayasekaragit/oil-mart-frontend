import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './shared/Navbar'
export default function Products() {
  return (
    <>
    <div>
        <Navbar/> 
        <Link to="/" className='underline'> Go to dashboard</Link>
    </div>
    </>
  )
}
