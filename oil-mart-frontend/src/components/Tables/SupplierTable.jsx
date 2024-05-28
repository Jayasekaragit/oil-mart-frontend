import React, { useState, useEffect } from 'react';
import SupplierModal from './SupplierModal';

const SupplierTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch supplier data from backend API
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierClick = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/${supplierId}/products`);
      const data = await response.json();
      setProducts(data);
      setSelectedSupplier(suppliers.find(supplier => supplier.id === supplierId));
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setProducts([]);
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} onClick={() => handleSupplierClick(supplier.id)}>
              <td>{supplier.supplier_name}</td>
              <td>{supplier.supplier_location}</td>
              <td>{supplier.supplier_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <SupplierModal supplier={selectedSupplier} products={products} onClose={closePopup} />
      )}
    </div>
  );
};

export default SupplierTable;
