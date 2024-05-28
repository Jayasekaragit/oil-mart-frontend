import React from 'react';

const SupplierModal = ({ supplier, products, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={onClose}>Close</button>
        <h2>Products Supplied by {supplier && supplier.supplier_name}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              {/* Add more product attributes as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.p_name}</td>
                <td>{product.sell_price}</td>
                {/* Add more product attributes as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierModal;
