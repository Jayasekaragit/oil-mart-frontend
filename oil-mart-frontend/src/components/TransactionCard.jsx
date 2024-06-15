import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingTop: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});

const TransactionCard = (props) => {
  const { transaction_id, transaction_items, cashierName,customerName,is_credit_sale } = props.transaction;

  const totalCashReceived = transaction_items.reduce((acc, item) => acc + item.cash, 0);
  const totalTransactionPrice = transaction_items.reduce((acc, item) => acc + item.total_price, 0);
  const discountPercentage = transaction_items[0].discount || 0;
  const discountAmount = (totalTransactionPrice * discountPercentage) / 100;
  const discountedTotalPrice = totalTransactionPrice - discountAmount;
  const change = totalCashReceived - discountedTotalPrice;
  // const [paid,setPaid] = useState(1);
  // const [customerName, setCustomerName] = useState("");
  // // const customerName = transaction_items.customerName;
  // if(customerName == true){
  //   setCustomerName(customerName)
  // }

  const [showPDF, setShowPDF] = useState(false);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };
  const handleDeleteTransaction = () => {
    axios.delete(`http://localhost:5000/api/transaction/${transaction_id}`)
      .then(response => {
        console.log(response.data); // Log success message if needed
        // Call parent component callback to remove the transaction from the list
        props.onDeleteTransaction(transaction_id);
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
        // Handle error as needed
      });
  };
  const onDeleteTransaction = (id) => {
    // Send a DELETE request to the API to delete the notification
    axios.delete(`http://localhost:5000/api/transaction/${transaction_id}`)
      .then(response => {
        // Remove the deleted notification from the state
          alert("succesfully removed")
        // setNotifications(notifications.filter(notification => notification.id !== id));
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
  };
  const handleMarkAsPaid = (id) => {
    // setPaid(0);
    axios.put(`http://localhost:5000/api/updateTransaction/${transaction_id}`)
      .then(response => {
        // Remove the deleted notification from the state
          alert("Customer paid the invoce")
        // setNotifications(notifications.filter(notification => notification.id !== id));
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Receipt</h2>
      <p className="text-gray-600 mb-4 text-center">Transaction ID: {transaction_id}</p>
      <ul className="divide-y divide-gray-200">
        {transaction_items.map((item, index) => (
          <li key={index} className="flex py-2">
            <div className="w-2/3">
              <p className="font-semibold">{item.product_name}</p>
              {is_credit_sale ?  (
              <p className="font-semibold text-red-600">Credit Customer:  {customerName}</p>
      ) : (
        <p></p>
      )}
              {/* <p className="font-semibold text-red-600">Credit Customer:  {customerName}</p> */}
              <p className="text-gray-600">Unit Price: Rs. {item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="w-1/3 text-right">
              <p className="font-semibold">Total: Rs. {item.total_price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <p className="font-semibold">Total: Rs. {totalTransactionPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Discount ({discountPercentage}%): Rs. {discountAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Total After Discount: Rs. {discountedTotalPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Cash Received: Rs. {totalCashReceived.toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-2">
        <p className="font-semibold">Change: Rs. {change.toFixed(2)}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={togglePDFView} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {showPDF ? 'Show Web View' : 'Show PDF'}
        </button>
        {is_credit_sale ? (
          <button onClick={handleMarkAsPaid}  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded">
            Mark as Paid
          </button>
        ) : null}
        <button onClick={onDeleteTransaction} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded">
        Delete
      </button>
      </div>
      
      {/* Conditional rendering based on showPDF state */}
      {showPDF ? (
        <PDFViewer width="100%" height={600}>
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.title}>Invoice</Text>

              <View style={styles.section}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Description</Text>
                  <Text style={styles.headerText}>Amount</Text>
                </View>
                {transaction_items.map((item, index) => (
                  <View style={styles.itemRow} key={index}>
                    <Text>{item.product_name}</Text>
                    <Text>Rs. {item.total_price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.boldText}>Total:</Text>
                <Text style={styles.boldText}>Rs. {totalTransactionPrice.toFixed(2)}</Text>
              </View>

              <View style={styles.section}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Payment Details</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text>Discount ({discountPercentage}%):</Text>
                  <Text>Rs. {discountAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text>Total After Discount:</Text>
                  <Text>Rs. {discountedTotalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text>Cash Received:</Text>
                  <Text>Rs. {totalCashReceived.toFixed(2)}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text>Change:</Text>
                  <Text>Rs. {change.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.footer}>
                <Text>Cashier: {cashierName}</Text>
                <Text>Thank you for your purchase!</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      ) : null}
    </div>
  );
};

export default TransactionCard;
