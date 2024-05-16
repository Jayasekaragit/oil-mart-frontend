import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Test() {
    
    const [result, setResults] = useState([]);
    useEffect(()=>{
        const fetchAllProducts = async()=>{
            try{
                const res =await axios.get('http://localhost:5000/users');
                console.log(res.data);
                // console.log(data);
                setResults(res.data);
                // console.log(data[0])
            }
            catch(err){
              console.log(err)
            }
        }
        fetchAllProducts()
      },[]);
  return (
    <>
        {result.map((user)=>{
            return(
                <div className='flex flex-auto flex-row'>
                    <h1>{user.id}</h1>
                    <h1>{user.userName}</h1>
                    <h1>{user.price}</h1>
                    <h1>{user.barcode}</h1>
                </div>
            )
        })}
    </>
  )
}
