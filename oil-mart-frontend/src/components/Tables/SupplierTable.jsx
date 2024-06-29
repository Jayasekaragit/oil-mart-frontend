import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch suppliers when component mounts
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSupplierClick = async (supplierId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suppliers/${supplierId}/products`);
      setProducts(response.data);
      setSelectedSupplier(supplierId);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
};

  return (
    <div>
      <h1>Suppliers</h1>
      <div className='flex '>
        <div className='basis-1/3 p-6'>
        <div className="bg-white p-6 rounded-lg shadow-lg">
    <h1 className="text-xl font-bold mb-4">Suppliers</h1>
    <table className="min-w-full table-auto">
        <thead>
            <tr>
                <th className="px-4 py-2 bg-gray-200">ID</th>
                <th className="px-4 py-2 bg-gray-200">Name</th>
                <th className="px-4 py-2 bg-gray-200">Location</th>
                <th className="px-4 py-2 bg-gray-200">Number</th>
            </tr>
        </thead>
        <tbody>
            {suppliers.map((supplier) => (
                <tr key={supplier.supplier_id} onClick={() => handleSupplierClick(supplier.supplier_id)} className="cursor-pointer hover:bg-gray-100">
                    <td className="border px-4 py-2">{supplier.supplier_id}</td>
                    <td className="border px-4 py-2">{supplier.supplier_name}</td>
                    <td className="border px-4 py-2">{supplier.suppplier_location}</td>
                    <td className="border px-4 py-2">{supplier.supplier_number}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>
        <div className='basis-2/3 m-2'>
        {selectedSupplier && (
  <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
    <h2 className="text-xl font-bold mb-4">
      Products supplied by {suppliers.find((supplier) => supplier.supplier_id === selectedSupplier).supplier_name}
    </h2>
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-200">Product Name</th>
          <th className="px-4 py-2 bg-gray-200">Buy Price</th>
          <th className="px-4 py-2 bg-gray-200">No of Items Bought</th>
          <th className="px-4 py-2 bg-gray-200">Purchased date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.inventory_id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{product.product_name}</td>
            <td className="border px-4 py-2">{product.buy_price}</td>
            <td className="border px-4 py-2">{product.pack_size}</td>
            <td className="border px-4 py-2">{formatDate(product.purchase_date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        </div>
      </div>
     
     
    </div>
  );
};

export default SupplierTable;
