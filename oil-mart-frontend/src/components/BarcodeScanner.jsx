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
  const [cashierName, setCashierName] = useState(userName);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [isCreditSale, setIsCreditSale] = useState(0); // New state for credit sale
  const [customerName, setCustomerName] = useState(""); // New state for customer name

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cashier/products');
        setTimeout(() => {
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

  useEffect(() => {
    const totalAmount = cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0);
    const discountAmount = (totalAmount * discountPercentage) / 100;
    setDiscountedTotal(totalAmount - discountAmount);
  }, [cart, discountPercentage]);

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
        if (updatedQuantity < 0) {
          alert("Quantity cannot be less than 0.");
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
    const discountAmount = (totalAmount * discountPercentage) / 100;
    const discountedTotal = totalAmount - discountAmount;
    const receivedAmount = parseFloat(moneyReceived);
    if (!isNaN(receivedAmount)) {
      setBalance(receivedAmount - discountedTotal);
    } else {
      alert("Please enter a valid amount for money received.");
    }
    setShowBill(true);
  };

  const handleCloseBill = () => {
    setShowBill(false);
  };
  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };
  const handleIsCreditSaleChange = (event) => {
    setIsCreditSale(event.target.checked);
  
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
        cashierName: userName,
        discountPercentage: discountPercentage, // Include discount percentage in the transaction data
        is_credit_sale: isCreditSale, // Include the credit sale status
        customerName: isCreditSale ? customerName : null // Include the customer name if it's a credit sale
      });
  
      // const transactionId = response.data.transaction_id;
      // const billPdfResponse = await axios.get(`http://localhost:5000/cashier/transactions/${transactionId}/bill`, { responseType: 'blob' });
      // const url = window.URL.createObjectURL(new Blob([billPdfResponse.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'bill.pdf');
      // document.body.appendChild(link);
      // link.click();
  
      // Clear cart and form fields after saving
      setCart([]);
      setSearchBarcode(""); 
      setMoneyReceived(""); 
      setDiscountPercentage(0); // Reset discount percentage
      setBalance(0); 
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="barcode-scanner flex">
      <div className="left-pane basis-3/5 p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Search Barcode:</label>
          <input 
            autoFocus
            type="text"
            placeholder="Search barcode"
            value={searchBarcode}
            onChange={(e) => setSearchBarcode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="barcode-input border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <table className="results-table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Item Type</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Barcode</th>
            </tr>
          </thead>
          <tbody>
            {results.filter(item => searchBarcode !== "" ? item.barcode.includes(searchBarcode) : item)
              .map((data, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="border border-gray-300 p-2">{data.brand_name}</td>
                  <td className="border border-gray-300 p-2">{`${data.sub_cat_name}`}</td>
                  <td className="border border-gray-300 p-2">{data.product_name}</td>
                  <td className="border border-gray-300 p-2">Rs {data.sell_price}</td>
                  <td className="border border-gray-300 p-2">{data.total_quantity}</td>
                  <td className="border border-gray-300 p-2">{data.barcode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="right-pane basis-2/5 p-4">
        <table className="cart-table w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="border border-gray-300 p-2">{product.product_name}</td>
                <td className="border border-gray-300 p-2">{product.quantity}</td>
                <td className="border border-gray-300 p-2">Rs {product.sell_price}</td>
                <td className="border border-gray-300 p-2">Rs {product.totalPrice.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleIncreaseQuantity(product.barcode)}>+</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDecreaseQuantity(product.barcode)}>-</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="border border-gray-300 p-2 font-bold">Total</td>
              <td colSpan="2" className="border border-gray-300 p-2">Rs {
                cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0).toFixed(2)
              }</td>
            </tr>
          </tbody>
        </table>
        {cart.length === 0 && <div>No products added to the cart</div>}
        <form className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Discount Percentage:</label>
            <input 
              type="number" 
              value={discountPercentage} 
              onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))} 
              className="border-2 border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total After Discount:</label>
            <input 
              type="text" 
              value={discountedTotal.toFixed(2)} 
              readOnly
              className="border-2 border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Money Received:</label>
            <input 
              type="number" 
              value={moneyReceived} 
              onChange={handleMoneyReceivedChange} 
              className="border-2 border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div className="input-container">
          <label>Credit Sale:</label>
          <input
            type="checkbox"
            checked={isCreditSale}
            onChange={handleIsCreditSaleChange}
          />
        </div>
        {isCreditSale && (
          <div className="input-container">
            <label>Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={handleCustomerNameChange}
            />
          </div>
        )}
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleSubmitCart}>Submit Cart</button>
          {/* <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-2" onClick={generateReport}>Generate Inventory Report</button> */}
        </form>
      </div>

      {showBill && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Bill Summary</h2>
            <table className="bill-table w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="border border-gray-300 p-2">{product.product_name}</td>
                    <td className="border border-gray-300 p-2">{product.quantity}</td>
                    <td className="border border-gray-300 p-2">Rs {product.sell_price}</td>
                    <td className="border border-gray-300 p-2">Rs {product.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-2 font-bold">Total</td>
                  <td className="border border-gray-300 p-2">Rs {
                    cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0).toFixed(2)
                  }</td>
                </tr>
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-2 font-bold">Discount ({discountPercentage}%)</td>
                  <td className="border border-gray-300 p-2">Rs {
                    ((cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0) * discountPercentage) / 100).toFixed(2)
                  }</td>
                </tr>
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-2 font-bold">Total After Discount</td>
                  <td className="border border-gray-300 p-2">Rs {
                    discountedTotal.toFixed(2)
                  }</td>
                </tr>
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-2 font-bold">Money Received</td>
                  <td className="border border-gray-300 p-2">Rs {moneyReceived}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="border border-gray-300 p-2 font-bold">Balance</td>
                  <td className="border border-gray-300 p-2">Rs {balance.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleSaveAndPrintBill}>Save & Print</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleCloseBill}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarcodeScanner;
