import React from 'react';
import './sidebar2.css'; // Ensure this is the path to your CSS file

const Sidebar2 = ({ onButtonClick }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onButtonClick("orders")}>Order</button>
      <button onClick={() => onButtonClick("users")}>Users</button>
      <button onClick={() => onButtonClick("products")}>Products</button>
      <button onClick={() => onButtonClick("create-product")}>Create Product</button>
        <button onClick={() => onButtonClick("categories")}>Category</button>
        <button onClick={() => onButtonClick("sub-categories")}>Subcategory</button>
    </div>
  );
};

export default Sidebar2;
