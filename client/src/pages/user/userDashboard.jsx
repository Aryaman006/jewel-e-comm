import React, { useState, useEffect } from 'react';
import "../admin/sidebar2.css"
import Profile from './profile';
import UserTab2 from './usertab2';
import UserTab from './userTab';
import OrderComponent from './order';

const UserDashboard = () => {
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
        return <OrderComponent />;
      case 'profile':
        return <Profile />;
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
          <UserTab2 isOpen={isOpen} onButtonClick={handleButtonClick} onClose={() => setIsOpen(false)} />
        ) : (
          <UserTab onButtonClick={handleButtonClick} />
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

export default UserDashboard;
