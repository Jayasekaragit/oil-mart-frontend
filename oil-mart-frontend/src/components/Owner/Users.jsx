// import React, { useEffect, useState } from 'react';  // Added useState

// import { Link } from 'react-router-dom'
// import AddUserForm from '../Forms/AddUserForm'
// import DashboardStatGrid from '../DashboardStatGrid'
// import ChartSales from '../ChartSales'
// import PieChartSupplier from '../PieChartSupplier'
// import RecentOrders from '../RecentOrders'
// import PopularProducts from '../PopularProducts'
// import UserTable from '../Tables/UserTable'
// import axios from 'axios';

// export default function Users() {

//   return (
//     <>
//     <div class="flex flex-row">
//   {/* <div class="basis-1/4 bg-slate-400">01</div> */}
//   <div class="basis-3/4">
//     <UserTable />
//   </div>
//   <div class="basis-1/4 bg-yellow-200">
//     <AddUserForm/>
//   </div>
// </div>
//     </>
//   )
// }

import React, { useEffect, useState } from "react"; // Added useState

import { Link } from "react-router-dom";
import AddUserForm from "../Forms/AddUserForm";
import DashboardStatGrid from "../DashboardStatGrid";
import ChartSales from "../ChartSales";
import PieChartSupplier from "../PieChartSupplier";
import RecentOrders from "../RecentOrders";
import PopularProducts from "../PopularProducts";
import UserTable from "../Tables/UserTable";
import axios from "axios";

export default function Users() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const [result, setResults] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/adduser",
        formData
      );
      setTimeout(() => {
        // window.location.reload();
        fetchAllProducts();
      }, 500);
      console.log("Response:", response.data);
      alert("User registration successful");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  const fetchAllProducts = async()=>{
    try{
        const res =await axios.get('http://localhost:5000/users');
        // console.log(res.data);
        // console.log(data);
        setResults(res.data);
        // console.log(data[0])
    }
    catch(err){
      console.log(err)
    }
}

useEffect(()=>{
    fetchAllProducts()
  },[]);

  return (
    <>
      <div class="flex flex-row">
        {/* <div class="basis-1/4 bg-slate-400">01</div> */}
        <div class="basis-3/4">
          <UserTable result={result} />
        </div>
        <div class="basis-1/4 bg-yellow-200">
          <AddUserForm setFormData={setFormData} handleSubmit={handleSubmit} formData={formData} />
        </div>
      </div>
    </>
  );
}
