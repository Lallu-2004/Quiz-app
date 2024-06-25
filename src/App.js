import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import QuizSelection from './Pages/QuizSelection';
import Quiz from './Pages/Quiz';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const { user } = useAuth();

  const fetchQuestions = async (category, difficulty) => {
    try {
      let url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

      const { data } = await axios.get(url);

      if (data.response_code !== 0) {
        throw new Error('Error fetching questions: ' + data.response_code);
      }
      setQuizData(data.results);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home score={score} user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/quiz-questions"
            element={<QuizSelection fetchQuestions={fetchQuestions} />}
          />
          <Route
            path="/quiz"
            element={<Quiz quizData={quizData} score={score} setScore={setScore} setQuizData={setQuizData} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
