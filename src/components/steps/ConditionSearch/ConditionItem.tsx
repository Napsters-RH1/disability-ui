"use client";

import React from 'react';
import { Check } from 'lucide-react';
import type { Condition } from '../../../types';

interface ConditionItemProps {
  condition: Condition;
  isSelected: boolean;
  onSelect: () => void;
}

export const ConditionItem: React.FC<ConditionItemProps> = ({ 
  condition, 
  isSelected, 
  onSelect 
}) => (
  <div
    onClick={onSelect}
    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
      isSelected
        ? 'border-blue-600 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'
    }`}
    role="button"
    aria-pressed={isSelected}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{condition.name}</h3>
        <p className="text-gray-600">{condition.description}</p>
      </div>
      {isSelected && (
        <span className="text-blue-600 text-sm flex items-center gap-2">
          <Check size={16} />
          Selected
        </span>
      )}
    </div>
  </div>
);