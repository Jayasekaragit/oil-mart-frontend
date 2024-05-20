// // import React from 'react';
// // import  { useEffect, useState } from 'react';  // Added useState
// // import axios from 'axios';
// // import './Table.css';
// // import UpdateUserModel from '../Forms/UpdateUserModel';

// // const UserTable = () => {
    
// //     const [result, setResults] = useState([]);
// //     const [editingUser, setEditingUser] = useState(null);
// //     useEffect(()=>{
// //         const fetchAllProducts = async()=>{
// //             try{
// //                 const res =await axios.get('http://localhost:5000/users');
// //                 // console.log(res.data);
// //                 // console.log(data);
// //                 setResults(res.data);
// //                 // console.log(data[0])
// //             }
// //             catch(err){
// //               console.log(err)
// //             }
// //         }
// //         fetchAllProducts()
// //       },[]);

// //       const deleteUser = async (id) => {
// //         try {
// //           await axios.delete(`http://localhost:5000/admin/users/${id}`);
// //           console.log("Post deleted:", id);
// //           setResults(result.filter((user) => user.id !== id));
// //         } catch (error) {
// //           console.error("Error deleting user:", error);
// //         }
// //       };

// //       const updateUser = (user) => {
// //         setEditingUser(user);
// //         };

// //         const saveUser = async (userData) => {
// //             try {
// //                 const res = await axios.put(`http://localhost:5000/admin/users/${userData.id}`, userData);
// //                 setResults(result.map((user) => user.id === userData.id ? userData : user));
// //                 setEditingUser(null);
// //             } catch (error) {
// //                 console.error("Error updating user:", error);
// //             }
// //         };

// //     return (
// //         <>
// //         {/*  */}
        
// //         <UpdateUserModel isOpen={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} onSave={saveUser} />
// //                 <div className=" mx-auto my-10 overflow-hidden shadow-md sm:rounded-lg">
// //                 <table className="  w-full border-collapse border border-slate-500">
// //                     <thead>
// //                         <tr className="odd:bg-white even:bg-red-300">
// //                             <th className='border-separate border border-slate-500'>
// //                                 User Name
// //                             </th>
// //                             <th className='border-separate border border-slate-500'>
// //                                 Email
// //                             </th>
// //                             <th className='border-separate border border-slate-500'>
// //                                 Role
// //                             </th>
// //                             <th className='border-separate border border-slate-500'>
// //                                 Phone
// //                             </th>
// //                             <th className='border-separate border border-slate-500'>
// //                                 Action
// //                             </th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                     {result.map((user)=>{
// //                          return(
                            
               
// //                         <tr key={user.id} >
                             
// //                             <td className='border-separate border border-slate-500'>
// //                                 <p className="text-gray-900 whitespace-no-wrap">{user.userName}</p>
// //                             </td>
// //                             <td className='border-separate border border-slate-500'>
// //                                 <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
// //                             </td>
// //                             <td className='border-separate border border-slate-500'>
// //                                 <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
// //                             </td>
// //                             <td className='border-separate border border-slate-500'>
// //                                 <p className="text-gray-900 whitespace-no-wrap">{user.telNo}</p>
// //                             </td>
// //                             <td className='px-3 flex flex-row justify-around'>
// //                                 <button className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user.id)}>Delete</button>
// //                                 <button className="bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => updateUser(user)}>Update</button>
// //                             </td>
// //                         </tr>
// //                             )
// //                         })}
// //                     </tbody>
// //                 </table>
                
// //             </div>
                           
// //         </>
// //     );
// // };

// // export default UserTable;

import React from 'react';
import  { useEffect, useState } from 'react';  // Added useState
import axios from 'axios';
import './Table.css';
import UpdateUserModal from '../Forms/UpdateUserModel';


const SupplierTable = ({result,deleteUser,updateUser}) => {
//     const [showModal, setShowModal] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     const handleUpdateClick = (user) => {
//         setSelectedUser(user);
//         setShowModal(true);
//     };
    
//       // Function to update user data
     
    return (
        <>
        {/*  */}
        
        {/* <UpdateUserModel isOpen={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} onSave={saveUser} /> */}
                {/* <div className=" mx-auto my-10 overflow-hidden shadow-md sm:rounded-lg">
                <table className="  w-full border-collapse border border-slate-500">
                    <thead>
                        <tr className="odd:bg-white even:bg-red-300">
                            <th className='border-separate border border-slate-500'>
                                Supplier Name
                            </th>
                            <th className='border-separate border border-slate-500'>
                                Location
                            </th>
                           
                            <th className='border-separate border border-slate-500'>
                                Phone
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {result && result?.map((user)=>{
                         return(
                            
               
                        <tr key={user.id} >
                             
                            <td className='border-separate border border-slate-500'>
                                <p className="text-gray-900 whitespace-no-wrap">{user.userName}</p>
                            </td>
                            <td className='border-separate border border-slate-500'>
                                <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                            </td>
                            <td className='border-separate border border-slate-500'>
                                <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                            </td>
                            <td className='border-separate border border-slate-500'>
                                <p className="text-gray-900 whitespace-no-wrap">{user.telNo}</p>
                            </td>
                            <td className='px-3 flex flex-row justify-around'>
                                <button className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user.id)}>Delete</button>
                                <button className="bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() =>  handleUpdateClick(user)}>Update</button>
                            </td>
                        </tr>
                            )
                        })}
                    </tbody>
                </table>
                {showModal && (
                <UpdateUserModal
                    user={selectedUser}
                    onUpdate={updateUser}
                    onClose={() => setShowModal(false)}
                />
            )}
                
            </div> */}
                           
        </>
    );
};

export default SupplierTable;
