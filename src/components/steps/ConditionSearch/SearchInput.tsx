"use client";

import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
  initialValue: string;
  onValueChange: (value: string) => void;
}

export const SearchInput = React.memo(({ initialValue, onValueChange }: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(initialValue);

  const debouncedOnChange = useDebouncedCallback(
    (value: string) => {
      onValueChange(value);
    },
    1 // Reduced debounce time
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  }, [debouncedOnChange]);

  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        size={20} 
      />
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
        placeholder="Type to search conditions..."
        value={localValue}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';