import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import DashboardCashier from "./components/DashboardCashier";


import Products from "./components/Products";
import LoginForm from "./components/Authentication/Login";

import Suppliers from "./components/Owner/Suppliers";
import Users from "./components/Owner/Users";
import Test from "./components/Owner/Test";
import ProtectedRoute from "./useToken";
import LayoutCashier from "./components/shared/LayoutCashier";
import Orders from "./components/Forms/Orders";
import AddNewProductPage from "./components/Owner/AddNewProductPage";
import AddNewSupplyPage from "./components/Owner/AddNewSupplyPage";
import Transactions from "./components/Transactions";
import InventoryPage from "./components/Owner/InventoryPage";
import SupplierCashier from "./components/Cashier/SupplierCashier";
import ProductsTable from "./components/Forms/ProductsTable";
import Notifications from "./components/Notifications";
import ReturnTable from "./components/Tables/ReturnTable";
// import SuppliersCashier from "./components/Cashier/SupplierCashier";



function App() {
  // const { token, setToken } = useToken();

  // if(!token) {
  //   console.log(token);
  //   return <LoginForm setToken={setToken} />
  // }

  const userName = localStorage.getItem("user");
  console.log(userName);
  return (


    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route>  
        {/* <Route index element={<Dashboard />} /> */}
       
      </Route>
      
      <Route path="/admin" element={<ProtectedRoute role="Admin"><Layout userName = {userName}  /></ProtectedRoute>}>
        <Route path="dashboard" index element={<ProtectedRoute role="Admin"><Dashboard  userName = {userName}/></ProtectedRoute>} />
        <Route path="products" element={<Products />} />
        <Route path="transactions" element={<Transactions/>} />
        <Route path = "add_new_product" element={<AddNewProductPage/>} />
        <Route path = "new_stock" element={<AddNewSupplyPage/>} />
        <Route path="users" element={<Users />} />
        <Route path="changeProducts" element={<ProductsTable />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="notifications" element={<Notifications/>} />
        <Route path="inventory" element={<InventoryPage/>} />
        {/* <Route path="suppliers" element={<Suppliers />} /> */}
      </Route>
      <Route path="/cashier" element={<ProtectedRoute role="Cashier"><LayoutCashier userName = {userName}/></ProtectedRoute>}>
      <Route path="dashboard" index element={<ProtectedRoute role="Cashier"><DashboardCashier userName = {userName} /></ProtectedRoute>} />
        {/* <Route path="products" element={<Products />} /> */}
        <Route path="orders" element={<Orders />} />
        <Route path="transactions" element={<Transactions/>} />
        <Route path="products" element={<InventoryPage/>} />
        <Route path="return" element={<ReturnTable/>} />
        <Route path="suppliers" element={<SupplierCashier/>} />
        {/* <Route path="users" element={<Users />} /> */}
        {/* <Route path="suppliers" element={<Suppliers />} /> */}
      </Route>
      <Route path="login" element={<LoginForm/>} />
      {/* <Route path="signup" element={<SignupForm/>} /> */}
      {/* <Route path="test" element={<Test/>} /> */}
    </Routes>
  </Router>
//   <Router>
//   <Routes>
//     <Route path="/" element={<LoginForm />}>
//       <Route index element={<Dashboard />} />
//       <Route
//         path="products"
//         element={
//           <ProtectedRoute role="Cashier">
//             <Products />
//           </ProtectedRoute>
//         }
//       />
//     </Route>
//     <Route path="/admin" element={<Layout />}>
//       <Route
//         index
//         element={
//           <ProtectedRoute role="Admin">
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="users"
//         element={
//           <ProtectedRoute role="Admin">
//             <Users />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="suppliers"
//         element={
//           <ProtectedRoute role="Admin">
//             <Suppliers />
//           </ProtectedRoute>
//         }
//       />
//     </Route>
//     {/* <Route path="login" element={<LoginForm />} />   */}
//     <Route path="test" element={<Test />} />
//   </Routes>
// </Router>
  
);
} 

export default App;