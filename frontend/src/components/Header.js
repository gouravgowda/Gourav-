import React from 'react';
import { IoClose } from 'react-icons/io5';
import './Header.css';

const Header = ({ title, onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <IoClose size={24} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="user-profile">
          <div className="user-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <p className="user-name">{user.name || 'Student'}</p>
            <p className="user-email">{user.email || 'email@example.com'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
