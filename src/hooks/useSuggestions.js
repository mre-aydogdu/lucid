import { useState, useEffect } from 'react';
import { suggestionsData } from '../data/data';

const useSuggestions = (input) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input) {
      const filtered = suggestionsData.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  return { data: suggestions };
};

export default useSuggestions;
