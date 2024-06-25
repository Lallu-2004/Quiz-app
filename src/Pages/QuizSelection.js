import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Categories from '../data/Data';

const QuizSelection = ({ fetchQuestions }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty) {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate('/quiz');
    }
  };

  return (
    <div className='quiz-selection'>
      <div className='quiz-options'>
      <div className='quiz-header'>
        <h2>Quiz Selection</h2>
        <p>Choose a category and difficulty level to start your quiz!</p>
      </div>

        {error && <Alert style={{ marginBottom: 20 }} severity="error">Please select both category and difficulty.</Alert>}
        <TextField
          select
          label="Select Category"
          variant="outlined"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          fullWidth
          style={{ marginBottom: 20 }}
        >
          {Categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Difficulty"
          variant="outlined"
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
          fullWidth
          style={{ marginBottom: 20 }}
        >
          <MenuItem key="easy" value="easy">
            Easy
          </MenuItem>
          <MenuItem key="medium" value="medium">
            Medium
          </MenuItem>
          <MenuItem key="hard" value="hard">
            Hard
          </MenuItem>
        </TextField>
      </div>
      <div className='quiz-buttons'>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        <button onClick={handleSubmit} className="start-button">Start Quiz</button>
      </div>
    </div>
  );
};

export default QuizSelection;
