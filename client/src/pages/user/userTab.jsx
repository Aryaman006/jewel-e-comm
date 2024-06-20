import React from 'react';
// import './sidebar2.css'; // Ensure this is the path to your CSS file

const UserTab = ({ onButtonClick }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onButtonClick("orders")}>Order</button>
      <button onClick={() => onButtonClick("profile")}>Profile</button>
    </div>
  );
};

export default UserTab;
