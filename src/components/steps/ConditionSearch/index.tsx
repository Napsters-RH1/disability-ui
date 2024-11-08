"use client";

import React, { useState, useCallback } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Check } from 'lucide-react';
import { PermanentInput } from './PermanentInput';
import { ConditionsList } from './ConditionsList';
import type { Condition } from '../../../types';

interface ConditionSearchProps {
  selectedConditions: Condition[];
  conditions: Condition[];
  onConditionSelect: (condition: Condition) => void;
}

export const ConditionSearch: React.FC<ConditionSearchProps> = ({
  selectedConditions,
  conditions,
  onConditionSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const filteredConditions = conditions.filter(condition => 
    !searchTerm || 
    condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condition.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Search and select conditions
        </label>
        <PermanentInput onSearch={handleSearch} />
      </div>

      <div className="mt-4">
        <ConditionsList
          conditions={filteredConditions}
          selectedConditions={selectedConditions}
          onConditionSelect={onConditionSelect}
        />
      </div>

      {selectedConditions.length > 0 && (
        <div className="mt-6">
          <Alert>
            <Check className="h-4 w-4" />
            <AlertTitle>Selected Conditions ({selectedConditions.length})</AlertTitle>
            <AlertDescription>
              {selectedConditions.map(c => c.name).join(', ')}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ConditionSearch;