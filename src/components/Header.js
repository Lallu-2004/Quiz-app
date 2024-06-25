import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo"><Link to="/" className="nav-link">QuizMaster</Link></h1>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/quiz-questions" className="nav-link">Take a Quiz</Link>
          {user ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
