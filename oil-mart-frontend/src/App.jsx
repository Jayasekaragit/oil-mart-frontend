import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import SignupForm from "./components/Authentication/SignUp";
import Suppliers from "./components/Owner/Suppliers";
import Users from "./components/Owner/Users";
import Test from "./components/Owner/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
          {/* <Route path="suppliers" element={<Suppliers />} /> */}
        </Route>
        <Route path="login" element={<div>This is a login page</div>} />
        <Route path="signup" element={<SignupForm/>} />
        <Route path="test" element={<Test/>} />
      </Routes>
    </Router>
  );
} 

export default App;