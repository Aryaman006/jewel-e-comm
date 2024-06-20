import React from 'react';
import "./order.css"

const OrderSummary = ({ selectedOrder, port, setSelectedOrder }) => {
  if (!selectedOrder) return null;

  // Calculate the total price
  const totalPrice = selectedOrder.products.reduce((total, product) => {
    return total + (product.quantity * product.productId.price);
  }, 0);

  return (
    <div className="modal-backdrop">
      <div className="modal-card invoice">
        <div className="invoice-header">
          <h1>Horcrux</h1>
          <p>Titagarh Brahmasthan, 26 Park Road, Kolata-700119</p>
          <h2>Invoice #{selectedOrder._id}</h2>
          <div>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
          </div>
        </div>
        <div className="invoice-info">
          <div className="invoice-section">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {selectedOrder.users.name}</p>
            <p><strong>Email:</strong> {selectedOrder.users.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.users.phone}</p>
          </div>
          <div className="invoice-section">
            <h3>Billing Address</h3>
            <p>{selectedOrder.billingAddress}</p>
          </div>
          <div className="invoice-section">
            <h3>Shipping Address</h3>
            <p>{selectedOrder.shippingAddress}</p>
          </div>
        </div>
        <div className="invoice-products">
          <h3>Products Ordered</h3>
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`${port}/product/photo/${product.productId._id}`}
                      alt={product.productId.name}
                      style={{ height: "4rem", width: "4rem" }}
                    />
                  </td>
                  <td>{product.productId.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.productId.price.toFixed(2)}</td>
                  <td>${(product.quantity * product.productId.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="invoice-summary">
          <div className="invoice-summary-item">
            <p><strong>Total:</strong> ${selectedOrder.total}</p>
          </div>
          <div className="invoice-summary-item">
            <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
          </div>
          <div className="invoice-summary-item">
            <p><strong>Fulfillment Status:</strong> {selectedOrder.fulfillmentStatus}</p>
          </div>
        </div>
        <div className="invoice-notes">
          <h3>Notes:</h3>
          <p>{selectedOrder.notes}</p>
        </div>
        <div className="invoice-actions">
          <button className="btn btn-primary" onClick={() => window.print()}>Print Invoice</button>
          <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
