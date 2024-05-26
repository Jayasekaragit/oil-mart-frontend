import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './shared/Navbar'
import AddProductForm from './Forms/AddProductsForm'
import AddBrandForm from './Forms/AddBrandForm'
import AddCategoryForm from './Forms/AddCategoryForm'
import AddSubCategoryForm from './Forms/AddSubCategoryForm'
import ProductsTable from './Tables/ProductTable'
export default function Products() {
  return (
    <>
  <div className="flex  w-full">
    <div className='basis-2/4'>
    <BoxWrapper>
      <AddCategoryForm />
      <AddBrandForm />  
      <AddSubCategoryForm />
    </BoxWrapper>
    </div>
    <div className='basis-2/4'>
    <BoxWrapper>
      <AddProductForm />
    </BoxWrapper>
    </div>
   
    
  </div>
    </>
  )
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm flex-1 borgra-200 flex items-center flex-col m-0 p-0 ">
      {children}
    </div>
  );
}
