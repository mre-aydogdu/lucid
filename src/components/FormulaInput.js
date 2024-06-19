import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import useSuggestions from '../hooks/useSuggestions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './FormulaInput.css';

const FormulaInput = () => {
  const { formula, setFormula } = useStore();
  const [input, setInput] = useState('');
  const { data: suggestions } = useSuggestions(input);
  const [result, setResult] = useState('');

  const calculateResult = () => {
    try {
      const expression = formula.join('');
      // Use safer methods for expression evaluation instead of eval
      // For example, you can use a library like math.js
      // For demonstration, we'll use eval here but consider alternatives
      const result = eval(expression);
      return result.toString();
    } catch (error) {
      console.error('Error calculating result:', error);
      return '';
    }
  };

  useEffect(() => {
    setResult(calculateResult());
  }, [formula]);

  const handleTagSelection = (e, value) => {
    if (value) {
      setInput(prevInput => {
        const updatedInput = prevInput.trim();
        return updatedInput ? `${updatedInput} ${value} ` : `${value} `;
      });
      handleAddTag(value);
    }
  };

  const handleAddTag = (tag) => {
    let parsedTag = tag;
    if (typeof tag === 'string') {
      parsedTag = tag.trim();
    }

    let lastTag = formula[formula.length - 1];
    if (lastTag && (parsedTag[0] === '+' || parsedTag[0] === '-' || parsedTag[0] === '*' || parsedTag[0] === '/')) {
      lastTag += parsedTag;
      const updatedFormula = [...formula.slice(0, -1), lastTag];
      setFormula(updatedFormula);
      setInput(''); // Reset input state after adding operator
    } else {
      setFormula([...formula, parsedTag]);
    }
  };

  return (
    <Stack>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        label="Formula Input"
        fullWidth
        disabled
      />
      <Autocomplete
        multiple
        id="tags-standard"
        options={suggestions.map((option) => option.name)}
        inputValue={input}
        onInputChange={(e, value) => setInput(value)}
        onChange={(e, value) => handleTagSelection(e, value)}
        renderInput={(params) => <TextField {...params} label="Tag Input" />}
        className="formula-input"
      />
      <TextField
        value={result}
        label="Result"
        fullWidth
        disabled
      />
    </Stack>
  );
};

export default FormulaInput;
