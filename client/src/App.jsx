import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/user/profile";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import SingleProductPage from "./pages/singleProductPage";
import './index.css';
import UserDashboard from "./pages/user/userDashboard";
import { useAuth } from "./context/auth";

function App() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true); // Initially show login
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = user ? user.role === 'admin' : false;
  
   // Check if user exists

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };


  return (
    // <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header openRegisterModal={openRegisterModal} openLoginModal={openLoginModal}/>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:productId" element={<SingleProductPage/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
          {showRegisterModal && <Register onClose={closeRegisterModal} onSwitch={openLoginModal} />}
          {showLoginModal && <Login onClose={closeLoginModal} onSwitch={openRegisterModal} />}
          {/* {showForgotPasswordModal && <ForgotPassword closeModal={closeForgotPasswordModal}/>} */}
        </div>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
