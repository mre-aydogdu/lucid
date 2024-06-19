// components/FormulaInput.js
import React, { useState } from 'react';
import useStore from '../store/store';
import useSuggestions from '../hooks/useSuggestions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './FormulaInput.css'

const FormulaInput = () => {
  const { formula, addTag, removeTag } = useStore();
  const [input, setInput] = useState('');
  const { data: suggestions } = useSuggestions(input);

  const handleAddTag = (tag) => {
    addTag(tag.name);
    setInput('');
  };

  return (
    <div>
      <div>
        {formula.map((tag, index) => (
          <span key={index}>
            {tag}
            <button onClick={() => removeTag(index)}>x</button>
          </span>
        ))}
      </div>
      <Autocomplete
        options={suggestions || []}
        getOptionLabel={(option) => option.name}
        inputValue={input}
        onInputChange={(e, value) => setInput(value)}
        onChange={(e, value) => handleAddTag(value)}
        renderInput={(params) => <TextField {...params} label="Formula Input" />}
        className="formula-input"
      />
    </div>
  );
};

export default FormulaInput;
