"use client";

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock } from 'lucide-react';
import type { Condition, Document } from '../../../types';

interface ReviewProps {
  selectedConditions: Condition[];
  documents: Document[];
}

export const Review: React.FC<ReviewProps> = ({ selectedConditions, documents }) => {
  if (selectedConditions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Information</AlertTitle>
          <AlertDescription>
            Please complete all previous steps before reviewing your claim.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold mb-4">Claim Summary</h3>
        <div className="space-y-3">
          <SummaryItem 
            label="Conditions"
            value={
              <div className="text-right">
                {selectedConditions.map(condition => (
                  <div key={condition.id} className="font-medium">
                    {condition.name}
                  </div>
                ))}
              </div>
            }
          />
          <SummaryItem 
            label="Documents Uploaded"
            value={<span className="font-medium">{documents.length}</span>}
          />
          <SummaryItem 
            label="Status"
            value={
              <span className="text-orange-600 flex items-center gap-2">
                <Clock size={16} />
                Ready to Submit
              </span>
            }
          />
        </div>
      </div>

      <SubmitButton />
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-gray-600">{label}:</span>
    {value}
  </div>
);

const SubmitButton: React.FC = () => (
  <button 
    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
    onClick={() => alert('Claims submitted successfully!')}
  >
    Submit Claims
  </button>
);

export default Review;