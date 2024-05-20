import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import LoginForm from "./components/Authentication/Login";

import Suppliers from "./components/Owner/Suppliers";
import Users from "./components/Owner/Users";
import Test from "./components/Owner/Test";
import ProtectedRoute from "./useToken";



function App() {
  // const { token, setToken } = useToken();

  // if(!token) {
  //   console.log(token);
  //   return <LoginForm setToken={setToken} />
  // }
  return (


    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route>  
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="products" element={<Products />} />
      </Route>
      
      <Route path="/admin" element={<ProtectedRoute role="Admin"><Layout /></ProtectedRoute>}>
        <Route path="dashboard" index element={<ProtectedRoute role="Admin"><Dashboard /></ProtectedRoute>} />
        <Route path="users" element={<Users />} />
        <Route path="suppliers" element={<Suppliers />} />
        {/* <Route path="suppliers" element={<Suppliers />} /> */}
      </Route>
      <Route path="/cashier" element={<ProtectedRoute role="Cashier"><Layout /></ProtectedRoute>}>
        {/* <Route index element={<Dashboard />} /> */}
        {/* <Route path="users" element={<Users />} /> */}
        <Route path="suppliers" element={<Suppliers />} />
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