// components/steps/ConditionSearch/PermanentInput.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface PermanentInputProps {
  onSearch: (value: string) => void;
}

export const PermanentInput = ({ onSearch }: PermanentInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = () => {
      onSearch(input.value);
    };

    input.addEventListener('input', handleInput);
    return () => input.removeEventListener('input', handleInput);
  }, [onSearch]);

  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        size={20} 
      />
      <input
        ref={inputRef}
        type="text"
        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
        placeholder="Type to search conditions..."
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};