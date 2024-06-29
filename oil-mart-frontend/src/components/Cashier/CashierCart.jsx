import React from 'react'

export default function CashierCart({cart}) {
  
  return (
    <>
     <div className="right-pane">
        <table className="cart-table">
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
          </tbody>
        </table>
        {cart.length === 0 && <div>No products added to the cart</div>}
      </div>
    </>
  )
}
