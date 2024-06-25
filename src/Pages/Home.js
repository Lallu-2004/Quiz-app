import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, userQuizData } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/quiz-questions');
  };

  return (
    <div className="home">
      <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
      <h1>Learn 10X Faster!</h1>
      <h3>Unlock Your Potential With Our Quizzes</h3>
      <button onClick={handleGetStarted}>Get Started!</button>
    </div>
  );
};

export default Home;
