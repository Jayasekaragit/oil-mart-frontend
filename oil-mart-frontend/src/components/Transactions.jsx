import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionCard from './TransactionCard';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cashier/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
   

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full overflow-y-auto border border-gray-300 ">
    {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
    ))}
  </div>

    </>
   
  );
};

export default Transactions;
