import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const savedUSer = localStorage.getItem('user');
    return savedUSer ? JSON.parse(savedUSer) : []
  });
  const [token, setToken] = useState(null);
  const [port, setPort] = useState("https://jewel-e-comm.onrender.com/api/v1");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Retrieve user data from localStorage on mount
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(user));
  }, []);

  // Persist cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  console.log(user)

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, port, token, setToken, cart, addToCart, removeFromCart,setCart }}>
      {children}
    </AuthContext.Provider>
  );
};
