import React, { useState, useEffect } from 'react';
import './cart.css';
import { useAuth } from '../context/auth';
import axios from "axios";
import { FaTrash, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, removeFromCart, user, port, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [formattedSubtotal, setFormattedSubtotal] = useState(0);
  const [paymentId, setPaymentId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); // Add state for payment method

  // Sync cartItems with cart from context
  useEffect(() => {
    setCartItems(cart.map(item => ({ ...item, quantity: item.quantity || 1 })));
  }, [cart]);

  useEffect(() => {
    const calculateSubtotal = () => {
      return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const subtotal = calculateSubtotal();
    setFormattedSubtotal(subtotal);
  }, [cartItems]);

  const handleQuantityChange = (_id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === _id && item.quantity + delta > 0 ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleRemove = _id => {
    removeFromCart(_id); // Remove from context
    setCartItems(prevItems => prevItems.filter(item => item._id !== _id)); // Remove from local state
  };

  const handleInfo = product => {
    navigate(`/product/${product._id}`);
  };

  const handleChangeAddress = () => {
    navigate('/profile');
  };

  const handlePayment = async () => {
    console.log("handlepayment");
    try {
      if (!user) {
        setLoginOpen(true); // Open login modal if user is not logged in
        return; // Exit function if user is not logged in
      }

      if (paymentMethod === 'cod') {
        // Handle COD order creation
        createOrder('cod');
      } else {
        // Handle online payment
        const response = await axios.post(`${port}/payment/createOrder`, { amount: formattedSubtotal });
        const { data } = response;
        if (data && data.id) {
          const options = {
            key: 'rzp_test_N3DOMHqyUPoR3w', // Replace with your Razorpay API key
            amount: data.amount,
            currency: data.currency,
            name: 'Horcrux',
            description: 'Payment for your order',
            order_id: data.id,
            handler: response => {
              if (response.razorpay_payment_id) {
                setPaymentId(response.razorpay_payment_id);
                console.log(response);
                fetchPaymentStatus(response.razorpay_payment_id); // Pass the payment id directly
              }
            },
            prefill: {
              name: user ? user.name : '',
              email: user ? user.email : '',
              contact: user ? user.phone : '',
            },
            theme: {
              color: '#212121'
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const createOrder = async (paymentMode) => {
    try {
      const products = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const response = await fetch(`${port}/order/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ products, user: user._id, status: "Not Process", paymentMode }),
      });
      setCart([]);
      localStorage.removeItem("cart");
      console.log("After clearing cart:", cart);
      console.log("localStorage cart:", localStorage.getItem("cart"));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaymentStatus = async (id) => {
    try {
      const response = await axios.get(`${port}/payment/status/${id}`);
      console.log(response.data);
      if (response.data.status === "captured") {
        createOrder('online');
        setCart([]);
        localStorage.removeItem("cart");
      }
      return response.data.status;
    } catch (error) {
      console.error('Error fetching payment status:', error);
      return 'Unknown';
    }
  };

  // Close the login modal
  const handleCloseLoginModal = () => {
    setLoginOpen(false);
  };
  const handleCloseRegisterModal = () => {
    setRegisterOpen(false);
  };

  const handleLoginOnSwitch = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleRegisterOnSwitch = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="cart-content">
          <p>Your cart is empty.</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {loginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-md p-8 max-w-md w-full mx-4 relative">
            <Login onClose={handleCloseLoginModal} onSwitch={handleLoginOnSwitch}/>
          </div>
        </div>
      )}
      {registerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-md p-8 max-w-md w-full mx-4 relative">
            <Register onClose={() => setRegisterOpen(false)} onSwitch={handleRegisterOnSwitch}/>
          </div>
        </div>
      )}
      <div className="cart-content">
        {cartItems.map(product => (
          <div key={product._id} className="cart-card">
            <div className="detail-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price"><FaRupeeSign /> {product.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(product._id, -1)} style={{ backgroundColor: "#f0f0f0", width: "1rem" }}>-</button>
                  <span className="quantity">{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product._id, 1)} style={{ backgroundColor: "#f0f0f0", width: "1rem" }}>+</button>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                className="btn btn-error text-white"
                onClick={() => handleRemove(product._id)}
              >
                <FaTrash /> Remove
              </button>
              <button
                className="btn btn-info text-white"
                onClick={() => handleInfo(product)}
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="summary-card">
        <h1>Order Summary</h1>
        <div className="user-info">
          {user && (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </>
          )}
        </div>
        <div className="total-amount">
          Total: <FaRupeeSign /> {formattedSubtotal}
        </div>
        <div className="payment-method">
          <label>
            <input 
              type="radio" 
              value="online" 
              checked={paymentMethod === 'online'} 
              onChange={() => setPaymentMethod('online')}
            />
            Pay Online
          </label>
          <label>
            <input 
              type="radio" 
              value="cod" 
              checked={paymentMethod === 'cod'} 
              onChange={() => setPaymentMethod('cod')}
            />
            Cash on Delivery
          </label>
        </div>
        <button className="place-order-btn" onClick={handlePayment}>
          Place Order
        </button>
        <button className="btn btn-ghost" onClick={handleChangeAddress}>
          Change Address
        </button>
      </div>
    </div>
  );
};

export default Cart;
