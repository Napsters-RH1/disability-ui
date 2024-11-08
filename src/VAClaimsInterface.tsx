"use client";

import React from 'react';
import { Header } from './components/ui/Header';
import { ProgressBar } from './components/ui/ProgressBar';
import { NavigationButtons } from './components/ui/NavigationButtons';
import ConditionSearch from './components/steps/ConditionSearch';
import RequirementsReview from './components/steps/RequirementsReview';
import DocumentUpload from './components/steps/DocumentUpload';
import Review from './components/steps/Review';
import ChatAssistant from './components/ChatAssistant';
import { useVAClaimsState } from './components/hooks/useVAClaimsState';

const STEPS = ['Select Conditions', 'Review Requirements', 'Upload Evidence', 'Review & Submit'];

const VAClaimsInterface: React.FC = () => {
  const {
    step,
    setStep,
    selectedConditions,
    documents,
    conditions,
    handleConditionSelect,
    handleFileUpload
  } = useVAClaimsState();

  const handleContinue = () => {
    if (step < STEPS.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const StepContent = () => {
    switch(step) {
      case 1:
        return (
          <ConditionSearch
            selectedConditions={selectedConditions}
            conditions={conditions}
            onConditionSelect={handleConditionSelect}
          />
        );
      case 2:
        return <RequirementsReview selectedConditions={selectedConditions} />;
      case 3:
        return <DocumentUpload documents={documents} onFileUpload={handleFileUpload} />;
      case 4:
        return <Review selectedConditions={selectedConditions} documents={documents} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ProgressBar currentStep={step} steps={STEPS} />
        <StepContent />
        <NavigationButtons
          currentStep={step}
          totalSteps={STEPS.length}
          canContinue={step === 1 ? selectedConditions.length > 0 : true}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </main>
      <ChatAssistant />
    </div>
  );
};

export default VAClaimsInterface;