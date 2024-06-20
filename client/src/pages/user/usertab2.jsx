import React from 'react';
// import "./sidebar.css"

const UserTab2 = ({ onButtonClick, onClose, isOpen }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
      <div className="drawer-content">
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={onClose}></label>
        <ul className="menu p-4 w-80 min-h-screen bg-base-200 text-base-content">
          <li style={{marginTop:"100px"}}>
            <button onClick={onClose} className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Close
            </button>
          </li>
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
              onClick={() => onButtonClick("profile")}
              className="block w-full py-3 px-6 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTab2;
