import React from 'react';
import './divider.css'; // Assuming you have a CSS file for styling

const Divider = () => {
  return (
    <div className="divider">
      <div className="left-line"></div>
      <div className="italian-cursive" style={{fontSize:"60px"}}>H</div>
      <div className="right-line"></div>
    </div>
  );
}

export default Divider;
