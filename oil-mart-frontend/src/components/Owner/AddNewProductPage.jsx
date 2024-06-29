import React from 'react'
import AddProductForm from '../Forms/AddProductsForm'
import AddBrandForm from '../Forms/AddBrandForm'
import AddSubCategoryForm from '../Forms/AddSubCategoryForm'
import AddCategoryForm from '../Forms/AddCategoryForm'

export default function AddNewProductPage() {
  return (
    <>
    <div className='flex'>

        <div className='basis-1/2'>
        <AddProductForm />
        </div>
        <div className='basis-1/2'>
            <AddBrandForm /> <br />
            <AddCategoryForm/>
            <AddSubCategoryForm />
        </div>
    </div>
    </>
  )
}
