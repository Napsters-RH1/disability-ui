"use client";

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    canContinue: boolean;
    onBack: () => void;
    onContinue: () => void;
  }
  
  export const NavigationButtons = ({
    currentStep,
    totalSteps,
    canContinue,
    onBack,
    onContinue
  }: NavigationButtonsProps) => (
    <div className="max-w-2xl mx-auto mt-8 flex justify-between">
      <button
        className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onBack}
        disabled={currentStep === 1}
      >
        Back
      </button>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onContinue}
        disabled={!canContinue || currentStep === totalSteps}
      >
        Continue
      </button>
    </div>
  );