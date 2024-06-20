import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { useAuth } from '../context/auth';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { token, setUser, setToken, user } = useAuth();
  const isLoggedIn = Boolean(token);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate()
  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  // Close mobile menu on navigation link click
  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filterParams = new URLSearchParams({ search: searchTerm }).toString();
    navigate(`/shop?${filterParams}`);
    setSearchTerm(""); // Clear search term after redirection
  };

  // Render navigation links based on user authentication state
  const renderNavLinks = () => (
    <>
      <NavLink to="/" activeClassName="font-semibold" className="text-gray-600 hover:text-gray-800" onClick={handleNavLinkClick}>
        Home
      </NavLink>
      <NavLink to="/shop" activeClassName="font-semibold" className="text-gray-600 hover:text-gray-800" onClick={handleNavLinkClick}>
        Shop
      </NavLink>
      <NavLink to="/about" activeClassName="font-semibold" className="text-gray-600 hover:text-gray-800" onClick={handleNavLinkClick}>
        About
      </NavLink>
      <NavLink to="/contact" activeClassName="font-semibold" className="text-gray-600 hover:text-gray-800" onClick={handleNavLinkClick}>
        Contact
      </NavLink>
      {isLoggedIn ? (
        <button className="text-gray-600 hover:text-gray-800" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="text-gray-600 hover" onClick={() => setLoginOpen(true)}>
          Login
        </button>
      )}
      {!isLoggedIn && (
        <button className="text-gray-600 hover" onClick={() => setRegisterOpen(true)}>
          Register
        </button>
      )}
    </>
  );

  // Render mobile menu when open
  const renderMobileMenu = () => (
    menuOpen && (
      <div className="lg:hidden bg-white shadow-md fixed inset-0 flex flex-col items-center justify-center z-50 overflow-y-auto p-4">
        <nav className="flex flex-col items-center space-y-4">
          {renderNavLinks()}
        </nav>
      </div>
    )
  );

  // Handle switch between login and register modals
  const handleRegisterClick = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleLoginClick = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <header className="bg-white shadow-md w-full fixed z-10" style={{ zIndex: "2" }}>
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <NavLink to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-900">
            HORCRUX
          </NavLink>
          <div className="flex items-center space-x-4 lg:hidden">
            <NavLink to={user?.role === 1 ? '/admin' : '/user'} className="text-gray-600 hover">
              <FiUser className="h-6 w-6" />
            </NavLink>
            <NavLink to="/cart" className="text-gray-600 hover:text-gray-800">
              <FiShoppingBag className="h-6 w-6" />
            </NavLink>
            <button className="text-gray-600 hover" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <nav className="hidden lg:flex space-x-6 mt-4 lg:mt-0">
          {renderNavLinks()}
        </nav>
        <div className=" items-center space-x-4 p-2 lg:space-x-6 mt-4 lg:mt-0 hidden lg:flex">
          <NavLink to={user?.role == 1 ? "/admin" : "/user"} className="text-gray-600 hover:text-gray-800">
            <FiUser className="h-6 w-6" />
          </NavLink>
          <NavLink to="/cart" className="text-gray-600 hover:text-gray-800">
            <FiShoppingBag className="h-6 w-6" />
          </NavLink>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              style={{ border: "solid 2px brown", padding: "5px", backgroundColor: "transparent", color: "brown", borderRadius: "30px" }}
              placeholder="Search"
              className="border border-gray-300 rounded-full px-3 py-1 w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="ml-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <FiSearch className="text-gray-500 h-6 w-6" style={{ color: "brown" }} />
            </button>
          </form>
        </div>
      </div>
      {renderMobileMenu()}
      {registerOpen && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
<div className="bg-white shadow-lg rounded-md p-8 max-w-md w-full mx-4 relative">
<Register onClose={() => setRegisterOpen(false)} onSwitch={handleRegisterClick}/>
</div>
</div>
)}
{loginOpen && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
<div className="bg-white shadow-lg rounded-md p-8 max-w-md w-full mx-4 relative">
<Login onClose={() => setLoginOpen(false)} onSwitch={handleLoginClick} />
</div>
</div>
)}
    </header>
  );
}

export default Header