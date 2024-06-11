import React, { useEffect, useState } from "react";
import AddUserForm from "../Forms/AddUserForm";
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
  const [errors, setErrors] = useState({});
  const [result, setResults] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setTimeout(() => {
        fetchAllProducts();
      }, 500);
      console.log("Response:", response.data);
      alert("User registration successful");
    } catch (error) {
      console.error("Error adding user:", error.response.data);
      alert("Failed to add user: " + (error.response.data.message || error.message));
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      console.log("User deleted:", id);
      setResults(result.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/users/${userId}`,
        updatedUserData
      );
      console.log("User updated successfully:", response.data);
      setTimeout(() => {
        fetchAllProducts();
      }, 500);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/4">
          <UserTable
            result={result}
            deleteUser={deleteUser}
            updateUser={updateUser}
          />
        </div>
        <div className="basis-1/4 bg-yellow-200">
          <AddUserForm
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
}
