import React from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const SupplierModal = ({ supplier, onClose }) => {
  return (
    <Modal isOpen={!!supplier} onRequestClose={onClose} className="modal">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Products Provided by {supplier.name}</h2>
        <ul className="list-disc pl-5">
          {supplier.products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SupplierModal;
