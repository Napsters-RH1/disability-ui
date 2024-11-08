"use client";

import React from 'react';
import { Upload, FileText, Check } from 'lucide-react';
import type { Document } from '../../../types';

interface DocumentUploadProps {
  documents: Document[];
  onFileUpload: (files: FileList | null) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ documents, onFileUpload }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
          onChange={(e) => onFileUpload(e.target.files)}
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
          <DocumentItem key={index} document={doc} />
        ))}
      </div>
    </div>
  );
};

interface DocumentItemProps {
  document: Document;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => (
  <div className="flex items-center gap-3 p-3 border rounded-lg">
    <FileText size={20} />
    <span className="flex-1">{document.name}</span>
    <Check className="text-green-600" size={20} />
  </div>
);

export default DocumentUpload;