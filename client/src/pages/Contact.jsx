import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8" style={{marginTop:'50px',minHeight:"100vh"}}>
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Contact Us</h1>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Email</h2>
            <a href="mailto:aryamansingh@gmail.com" className="text-blue-600 hover:underline"></a>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Phone</h2>
            <a href="tel:+91 6289709420" className="text-blue-600 hover:underline">+1234567890</a>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Address</h2>
            <p className="text-gray-600"> Lakshmighat Titagarh MG Road Kolkata-700119, West Bengal, India</p>
            <a href="https://www.google.com/maps?q=P9J8+QH7 + Titgarh + kolkata + West Bengal + 700119 + India" className="text-blue-600 hover:underline block">View on Map</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
