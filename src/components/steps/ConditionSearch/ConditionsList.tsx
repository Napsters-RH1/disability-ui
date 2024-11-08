"use client";

import React from 'react';
import type { Condition } from '../../../types';
import { Check } from 'lucide-react';

interface ConditionsListProps {
  conditions: Condition[];
  selectedConditions: Condition[];
  onConditionSelect: (condition: Condition) => void;
}

export const ConditionsList = React.memo(({ 
  conditions, 
  selectedConditions, 
  onConditionSelect 
}: ConditionsListProps) => {
  return (
    <div className="space-y-4">
      {conditions.map(condition => (
        <div
          key={condition.id}
          onClick={() => onConditionSelect(condition)}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selectedConditions.some(c => c.id === condition.id)
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{condition.name}</h3>
              <p className="text-gray-600">{condition.description}</p>
            </div>
            {selectedConditions.some(c => c.id === condition.id) && (
              <span className="text-blue-600 text-sm flex items-center gap-2">
                <Check size={16} />
                Selected
              </span>
            )}
          </div>
        </div>
      ))}
      {conditions.length === 0 && (
        <div className="text-center p-4 text-gray-500">
          No conditions found matching your search
        </div>
      )}
    </div>
  );
});

ConditionsList.displayName = 'ConditionsList';