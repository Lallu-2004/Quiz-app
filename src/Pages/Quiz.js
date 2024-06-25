import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ quizData, score, setScore, setQuizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  // Define handleNextQuestion function
  const handleNextQuestion = useCallback(() => {
    if (quizData[currentQuestion]?.correct_answer === selectedAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer('');
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  }, [currentQuestion, quizData, selectedAnswer, setScore]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestion]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, handleNextQuestion]);

  useEffect(() => {
    if (currentQuestion >= quizData.length) {
      setQuizData((prevQuizData) => [
        ...prevQuizData,
        {
          topic: quizData[0]?.category,
          difficulty: quizData[0]?.difficulty,
          score,
        },
      ]);
      setShowResult(true);
    } else {
      setTimer(30);
    }
  }, [currentQuestion, quizData, score, setQuizData]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleQuitQuiz = () => {
    navigate('/');
  };

  if (!quizData || quizData.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    const topic = quizData[0]?.category;
    const difficulty = quizData[0]?.difficulty;
    return (
      <div className="score-card">
        <div className="score-header">Quiz Completed!</div>
        <div className="score-result">Your Score: {score}</div>
        <div className="score-details">
          <p>Topic: {topic}</p>
          <p>Difficulty: {difficulty}</p>
        </div>
        <div className="button-container">
          <button className="button" onClick={handleQuitQuiz}>
            Quit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="question-number">
        Question {currentQuestion + 1}/{quizData.length}
      </div>
      <h2 className="quiz-category">{quizData[currentQuestion]?.category}</h2>
      <div className="question">{quizData[currentQuestion]?.question}</div>
      <div className="answers">
        {(quizData[currentQuestion]?.incorrect_answers || []).concat(
          quizData[currentQuestion]?.correct_answer
        ).map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            className={`answer-button ${
              selectedAnswer === answer ? 'selected' : ''
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="timer">Time Left: {timer} seconds</div>
      <div className="button-container">
        <button className="quit-button" onClick={handleQuitQuiz}>
          Quit
        </button>
        <button className="next-button" onClick={handleNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
