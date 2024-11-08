"use client";

import React, { useState } from 'react';
import { AlertCircle, FileText, Upload, Search, Check, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ChatAssistant from './ChatAssistant';

interface Condition {
  id: number;
  name: string;
  description: string;
}

interface Document {
  name: string;
}

const VAClaimsInterface = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
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
  const [documents, setDocuments] = useState<Document[]>([]);

  // Removed unused state variables
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleConditionSelect = (condition: Condition) => {
    console.log('Selecting condition:', condition);
    setSelectedCondition(condition);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newDocuments = Array.from(files).map(file => ({
        name: file.name
      }));
      setDocuments(prev => [...prev, ...newDocuments]);
    }
  };

  const handleContinue = () => {
    console.log('Current step:', step);
    console.log('Selected condition:', selectedCondition);
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const ConditionSearch = () => (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Search for a condition
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            placeholder="Type to search conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {conditions
          .filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(condition => (
            <div
              key={condition.id}
              onClick={() => handleConditionSelect(condition)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedCondition?.id === condition.id 
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-semibold">{condition.name}</h3>
              <p className="text-gray-600">{condition.description}</p>
            </div>
          ))}
      </div>
    </div>
  );

  const RequirementsReview = () => {
    if (!selectedCondition) {
      return (
        <div className="max-w-2xl mx-auto mt-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Condition Selected</AlertTitle>
            <AlertDescription>
              Please go back and select a condition first.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    const requirements = [
      "Current medical diagnosis",
      "Service treatment records",
      "Lay statements or buddy statements",
      "Medical nexus letter"
    ];

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Evidence Requirements</AlertTitle>
          <AlertDescription>
            The following evidence is required to support your claim for {selectedCondition.name}
          </AlertDescription>
        </Alert>

        <div className="mt-6 space-y-4">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
              <FileText className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="font-medium">{req}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DocumentUpload = () => (
    <div className="max-w-2xl mx-auto mt-8">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
      >
        <Upload className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="font-semibold mb-2">Upload Evidence Documents</h3>
        <p className="text-gray-600 mb-4">
          Drag and drop files here or click to browse
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <label 
          htmlFor="file-upload"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
        >
          Select Files
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText size={20} />
            <span className="flex-1">{doc.name}</span>
            <Check className="text-green-600" size={20} />
          </div>
        ))}
      </div>
    </div>
  );

  const Review = () => {
    if (!selectedCondition) {
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
            <div className="flex justify-between">
              <span className="text-gray-600">Condition:</span>
              <span className="font-medium">{selectedCondition.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Documents Uploaded:</span>
              <span className="font-medium">{documents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-orange-600 flex items-center gap-2">
                <Clock size={16} />
                Ready to Submit
              </span>
            </div>
          </div>
        </div>

        <button 
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          onClick={() => alert('Claim submitted successfully!')}
        >
          Submit Claim
        </button>
      </div>
    );
  };

  const StepContent = () => {
    switch(step) {
      case 1:
        return <ConditionSearch />;
      case 2:
        return <RequirementsReview />;
      case 3:
        return <DocumentUpload />;
      case 4:
        return <Review />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <img 
            src="/api/placeholder/120/40" 
            alt="VA.gov Logo" 
            className="mr-4"
          />
          <h1 className="text-2xl font-bold">Disability Claims Assistant</h1>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto my-8">
          <div className="flex justify-between mb-2">
            {['Select Condition', 'Review Requirements', 'Upload Evidence', 'Review & Submit'].map((label, index) => (
              <div 
                key={label} 
                className={`text-sm ${step > index + 1 ? 'text-green-600' : 'text-gray-600'}`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <StepContent />
        
        <div className="max-w-2xl mx-auto mt-8 flex justify-between">
          <button
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleContinue}
            disabled={step === 4 || (step === 1 && !selectedCondition)}
          >
            Continue
          </button>
        </div>
      </main>
      <ChatAssistant />
    </div>
  );
};

export default VAClaimsInterface;