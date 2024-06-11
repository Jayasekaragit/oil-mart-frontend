import React, { useEffect, useState } from "react";
import axios from 'axios';
import BillPDF from "./Reports/BillPDF";
import './BarcodeScanner.css'; // Make sure to include your custom CSS for styling

function BarcodeScanner({userName}) {
  const [results, setResults] = useState([]);
  const [searchBarcode, setSearchBarcode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [moneyReceived, setMoneyReceived] = useState("");
  const [balance, setBalance] = useState(0);
  const[cashierName, setCashierName] = useState(userName);
// console.log(userName)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cashier/products');
        setTimeout(() => {
          // window.location.reload();
          fetchAllProducts();
        }, 500);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchBarcode !== "") {
      const product = results.find((item) => item.barcode === searchBarcode);
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null); // Clear selection if search is empty
    }
  }, [searchBarcode, results]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && selectedProduct) {
      event.preventDefault();

      if (selectedProduct.total_quantity <= 0) {
        alert(`The product ${selectedProduct.product_name} is out of stock and cannot be added to the cart.`);
        return;
      }

      let quantity;

      // Check if the product is a barrel type
      if (selectedProduct.product_name.includes("Barrel")) {
        // Prompt for the number of liters for barrel products
        quantity = prompt("Enter amount in liters for " + selectedProduct.product_name + ":", "1");
      } else {
        // Prompt for the quantity for regular products
        quantity = prompt("Enter quantity for " + selectedProduct.product_name + ":", "1");
      }

      if (quantity && !isNaN(quantity) && Number(quantity) > 0) {
        const requestedQuantity = Number(quantity);

        if (requestedQuantity > selectedProduct.total_quantity) {
          alert(`Only ${selectedProduct.total_quantity} units of ${selectedProduct.product_name} are available in stock.`);
          return;
        }

        const productWithQuantity = { 
          ...selectedProduct, 
          quantity: requestedQuantity,
          totalPrice: selectedProduct.sell_price * requestedQuantity // Calculate total price
        };

        const existingProductIndex = cart.findIndex(item => item.barcode === selectedProduct.barcode);

        if (existingProductIndex !== -1) {
          const updatedCart = cart.map((item, index) => {
            if (index === existingProductIndex) {
              const updatedQuantity = item.quantity + requestedQuantity;
              if (updatedQuantity > selectedProduct.total_quantity) {
                alert(`Only ${selectedProduct.total_quantity - item.quantity} additional units of ${selectedProduct.product_name} are available in stock.`);
                return item;
              }
              return { 
                ...item, 
                quantity: updatedQuantity,
                totalPrice: item.sell_price * updatedQuantity // Update total price
              };
            }
            return item;
          });
          setCart(updatedCart);
        } else {
          setCart(currentCart => [...currentCart, productWithQuantity]);
        }

        setSearchBarcode(""); // Clear search input after adding
      } else {
        alert("Please enter a valid positive quantity.");
      }
    }
  };
  
  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inventory/report', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory_report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleIncreaseQuantity = (barcode) => {
    const updatedCart = cart.map(item => {
      if (item.barcode === barcode) {
        const updatedQuantity = item.quantity + 1;
        return {
          ...item,
          quantity: updatedQuantity,
          totalPrice: item.sell_price * updatedQuantity
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (barcode) => {
    const updatedCart = cart.map(item => {
      if (item.barcode === barcode) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity < 1) {
          alert("Quantity cannot be less than 1.");
          return item;
        }
        return {
          ...item,
          quantity: updatedQuantity,
          totalPrice: item.sell_price * updatedQuantity
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleMoneyReceivedChange = (event) => {
    setMoneyReceived(event.target.value);
  };

  const handleSubmitCart = () => {
    const totalAmount = cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0);
    const receivedAmount = parseFloat(moneyReceived);
    if (!isNaN(receivedAmount)) {
      setBalance(receivedAmount - totalAmount);
    } else {
      alert("Please enter a valid amount for money received.");
    }
    setShowBill(true);
  };

  const handleCloseBill = () => {
    setShowBill(false);
  };

  const handleSaveAndPrintBill = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cashier/transactions', {
        transaction_items: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.sell_price,
          total_price: item.totalPrice,
          
        })),
        moneyReceived: moneyReceived,
        cashierName: userName
      });
  
      const transactionId = response.data.transaction_id;
  
      console.log(`Transaction ID: ${transactionId}`);
  
      setShowBill(false);

      // Clear the cart
      setCart([]);
      setMoneyReceived(""); 
      setBalance(0); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="scanner-container flex">
      <div className="left-pane basis-3/5">
        <input
          autoFocus
          type="text"
          placeholder="Search barcode"
          value={searchBarcode}
          onChange={(e) => setSearchBarcode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="barcode-input"
        />
        <br />
        <table className="results-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Item Type</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Barcode</th>
            </tr>
          </thead>
          <tbody>
            {results.filter(item => searchBarcode !== "" ? item.barcode.includes(searchBarcode) : item)
                     .map((data, index) => (
              <tr key={index}>
                <td>{data.brand_name}</td>
                <td>{`${data.sub_cat_name}`}</td>
                <td>{data.product_name}</td>
                <td>Rs {data.sell_price}</td>
                <td>{data.total_quantity}</td>
                <td>{data.barcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right-pane basis-2/5 p-4">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>{product.quantity}</td>
                <td>Rs {product.sell_price}</td>
                <td>Rs {product.totalPrice.toFixed(2)}</td>
                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleIncreaseQuantity(product.barcode)}>+</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDecreaseQuantity(product.barcode)}>-</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Total</td>
              <td>Rs {
                 cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0).toFixed(2)
              }</td>
            </tr>
          </tbody>
        </table>
        {cart.length === 0 && <div>No products added to the cart</div>}
        <div>
          <label>Money Received:</label>
          <input 
            type="number" 
            value={moneyReceived} 
            onChange={handleMoneyReceivedChange} 
            className="money-received-input"
          />
        </div>
        <button onClick={handleSubmitCart}>Submit Cart</button>
        <button onClick={generateReport}>Generate Inventory Report</button>
      </div>

      {showBill && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Bill Summary</h2>
            <table className="bill-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>Rs {product.sell_price}</td>
                    <td>Rs {product.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">Total</td>
                  <td>Rs {
                    cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0).toFixed(2)
                  }</td>
                </tr>
                <tr>
                  <td colSpan="3">Money Received</td>
                  <td>Rs {moneyReceived}</td>
                </tr>
                <tr>
                  <td colSpan="3">Balance</td>
                  <td>Rs {balance.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="modal-content">
      <h2>Bill Summary</h2>
      {/* Render the BillPDF component */}
      <BillPDF  cashierName={cashierName} cart={cart} moneyReceived={moneyReceived} balance={balance} handleCloseBill={handleCloseBill} handleSaveAndPrintBill={handleSaveAndPrintBill} />
    </div>
            <button onClick={handleCloseBill}>Close</button>
            <button onClick={handleSaveAndPrintBill}>Print</button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default BarcodeScanner;
