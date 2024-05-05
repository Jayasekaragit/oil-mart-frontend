import React from 'react'
import { Link } from 'react-router-dom'
export default function Products() {
  return (
    <>
    <div>
        this is the product page 
        <Link to="/" className='underline'> Go to dashboard</Link>
    </div>
    </>
  )
}
