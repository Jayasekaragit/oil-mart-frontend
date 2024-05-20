import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
const Navbar = () => {
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   axios.get('/admin/products')
  //     .then(response => setCategories(response.data))
  //     .catch(error => console.error('Error fetching categories:', error));
  // }, []);

  // const fetchAllProducts = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/admin/products");
  //     // console.log(res.data);
  //     // console.log(data);
  //     setCategories(res.data);
  //     // console.log(data[0])
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        const result = response.data;

        // Group the data hierarchically
        const groupedData = result.reduce((acc, item) => {
          const { category_name, subcategory_name, ...productDetails } = item;

          if (!acc[category_name]) {
            acc[category_name] = {};
          }

          if (!acc[category_name][subcategory_name]) {
            acc[category_name][subcategory_name] = [];
          }

          acc[category_name][subcategory_name].push(productDetails);

          return acc;
        }, {});

        setData(groupedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);



  const fetchAllCatergories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/catergories");
      // console.log(res.data);
      // console.log(data);
      setCategories(res.data);
      // console.log(data[0])
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCatergories();
  }, []);


  return (
    <>
    <Menu>
      <MenuButton>My account</MenuButton>
      
      <MenuItems anchor="bottom">
        {categories.map(category => (
          <MenuItem key={category.catergory_id}>
            <a className="block data-[focus]:bg-blue-100" href="/settings">
              <h1>

                {category.catergory_name}
          
              </h1>
            </a>
          </MenuItem>
        ))  
        }
      </MenuItems>
    </Menu>

    {/* {categories.map(category => (
      <div key={category.product_id}>
        <h2>{category.p_name}</h2> <br />
        <h2>{category.buy_price}</h2>
   
      </div>
    ))} */}
    </>
  );
};

export default Navbar;
