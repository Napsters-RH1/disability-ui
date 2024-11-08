"use client";

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, FileText } from 'lucide-react';
import type { Condition } from '../../../types';

interface RequirementsReviewProps {
  selectedConditions: Condition[];
}

const REQUIREMENTS = [
  "Current medical diagnosis",
  "Service treatment records",
  "Lay statements or buddy statements",
  "Medical nexus letter"
];

const RequirementItem: React.FC<{ requirement: string }> = ({ requirement }) => (
  <div className="flex items-start gap-3 p-4 border rounded-lg">
    <FileText className="text-blue-600 mt-1" size={20} />
    <div>
      <p className="font-medium">{requirement}</p>
    </div>
  </div>
);

export const RequirementsReview: React.FC<RequirementsReviewProps> = ({ selectedConditions }) => {
  if (selectedConditions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Conditions Selected</AlertTitle>
          <AlertDescription>
            Please go back and select at least one condition first.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {selectedConditions.map((condition, index) => (
        <div key={condition.id} className={index > 0 ? 'mt-8' : ''}>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Evidence Requirements for {condition.name}</AlertTitle>
            <AlertDescription>
              The following evidence is required to support your claim
            </AlertDescription>
          </Alert>

          <div className="mt-4 space-y-4">
            {REQUIREMENTS.map((req, reqIndex) => (
              <RequirementItem key={reqIndex} requirement={req} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequirementsReview;