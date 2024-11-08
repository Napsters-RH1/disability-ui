"use client";

import { useState, useCallback } from 'react';
import type { Condition, Document } from '../../types';

export const useVAClaimsState = () => {
  const [step, setStep] = useState(1);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [conditions] = useState<Condition[]>([
    {
      id: 1,
      name: "PTSD",
      description: "Post-traumatic stress disorder"
    },
    {
      id: 2,
      name: "Tinnitus",
      description: "Ringing in the ears"
    },
    {
      id: 3,
      name: "Sleep Apnea",
      description: "Sleep disorder"
    }
  ]);

  const handleConditionSelect = useCallback((condition: Condition) => {
    setSelectedConditions(prev => {
      const isSelected = prev.some(c => c.id === condition.id);
      if (isSelected) {
        return prev.filter(c => c.id !== condition.id);
      } else {
        return [...prev, condition];
      }
    });
  }, []);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newDocuments = Array.from(files).map(file => ({
        name: file.name
      }));
      setDocuments(prev => [...prev, ...newDocuments]);
    }
  }, []);

  return {
    step,
    setStep,
    selectedConditions,
    documents,
    conditions,
    handleConditionSelect,
    handleFileUpload
  };
};