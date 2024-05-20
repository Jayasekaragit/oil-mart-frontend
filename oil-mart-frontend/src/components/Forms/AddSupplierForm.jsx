// import React, { useState } from 'react';
// import axios from 'axios';

// const AddUserForm = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         role: '',
//         phone: ''
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/adduser', formData);
//             console.log('Response:', response.data);
//             alert('User registration successful');
            
//         } catch (error) {
//             console.error('Error adding user:', error);
//             alert('Failed to add user');
//         }
//     };
//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//             <form onSubmit={handleSubmit}>
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h2>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//                         Username
//                     </label>
//                     <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
//                         Role
//                     </label>
//                     <select
//                         name="role"
//                         id="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
//                     >
//                         <option value="">Select a Role</option>
//                         <option value="1">Admin</option>
//                         <option value="2">Cashier</option>
//                         <option value="3">Inventory_Manager</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//                         Phone Number
//                     </label>
//                     <input
//                         type="text"
//                         name="phone"
//                         id="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Add User
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddUserForm;


import React, { useState } from 'react';
import axios from 'axios';

const AddSupplierForm = ({setFormData, handleSubmit, formData}) => {
  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Supplier</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Supplier Name
                    </label>
                    <input
                        type="text"
                        name="supplierName"
                        id="supplierName"
                        value={formData.supplierName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Locatioin
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
          
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Supplier
                </button>
            </form>
        </div>
    );
};

export default AddSupplierForm;
