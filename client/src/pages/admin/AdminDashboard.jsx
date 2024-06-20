import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Orders from './Orders';
import Users from './Users';
import Categories from './Categories';
import SubCategoryComponent from './SubCategorys';
import CreateProductContainer from './CreateProduct';
import Sidebar2 from './sidebar2';
import "./sidebar2.css"
import ProductMaintenance from './Products';
import Order2 from './Order2';
import './AdminDashboard.css'; // Import your CSS for styling

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [mainContentZIndex, setMainContentZIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setIsOpen(true); // Ensure sidebar is open on resize for small screens
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = (section) => {
    setCurrentComponent(getComponent(section));

    if (isSmallScreen) {
      setIsOpen(false); // Close sidebar on small screens after clicking a section
      setMainContentZIndex(0); // Ensure main content is in front after closing sidebar
    } else {
      setMainContentZIndex(1); // Bring main content forward when sidebar is open on large screens
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setMainContentZIndex(isOpen ? 0 : 1); // Toggle z-index of main content when toggling sidebar
  };

  const getComponent = (section) => {
    switch (section) {
      case 'orders':
        return <Orders />;
      case 'users':
        return <Users />;
      case 'products':
        return <ProductMaintenance />;
      case 'categories':
        return <Categories />;
      case 'sub-categories':
        return <SubCategoryComponent />;
      case 'create-product':
        return <CreateProductContainer />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard" style={{ minHeight: '100vh', overflowX: 'auto' }}>
      {isSmallScreen && !isOpen && (
        <button className="btn btn-ghost" onClick={handleToggle} style={{ marginTop: '100px', width: '150px' }}>
          {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
      )}
      <div className={isSmallScreen ? 'sidebar' : 'sidebar-large'} style={{ zIndex: 1 }}>
        {isSmallScreen ? (
          <Sidebar isOpen={isOpen} onButtonClick={handleButtonClick} onClose={() => setIsOpen(false)} />
        ) : (
          <Sidebar2 onButtonClick={handleButtonClick} />
        )}
      </div>
      <div className={isSmallScreen ? 'main-content' : 'main-content-large'} style={{ zIndex: isOpen ? 0 : 1 }}>
        <div className="component" style={{ marginTop: '50px' }}>
          {currentComponent}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
