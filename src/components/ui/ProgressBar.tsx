"use client";

interface ProgressBarProps {
    currentStep: number;
    steps: string[];
  }
  
  export const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-between mb-2">
        {steps.map((label, index) => (
          <div 
            key={label} 
            className={`text-sm ${currentStep > index + 1 ? 'text-green-600' : 'text-gray-600'}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );