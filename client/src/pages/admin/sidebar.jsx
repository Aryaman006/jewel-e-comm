import React from 'react';
import "./sidebar.css"

const Sidebar = ({ onButtonClick, onClose, isOpen }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
      <div className="drawer-content">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={onClose}></label>
        <ul className="menu p-4 w-80 min-h-screen bg-base-200 text-base-content">
          <li style={{marginTop:"100px"}}>
            <button onClick={onClose} className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Close
            </button>
          </li>
          {/* Sidebar content here */}
          <li>
            <button
              onClick={() => onButtonClick("orders")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => onButtonClick("users")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Users
            </button>
          </li>
          <li>
            <button
              onClick={() => onButtonClick("create-product")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Create Product
            </button>
          </li>
          <li>
            <button
              onClick={() => onButtonClick("products")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => onButtonClick("categories")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Categories
            </button>
          </li>
          <li>
            <button
              onClick={() => onButtonClick("sub-categories")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Sub-Categories
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
