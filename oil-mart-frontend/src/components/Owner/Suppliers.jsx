import React from 'react'
import { Link } from 'react-router-dom'
import AddUserForm from '../Forms/AddUserForm'
export default function Suppliers() {
  return (
    <>
    <div>
        this is the Supplier page
        <Link to="/" className='underline'> Go to dashboard</Link>
        <div>
            <AddUserForm/>
        </div>
    </div>
    </>
  )
}
