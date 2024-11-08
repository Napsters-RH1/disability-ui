# VA Disability Claims Assistant

A user-friendly web application built with Next.js and React to help veterans manage their VA disability claims process. The application provides an intuitive interface for searching and selecting medical conditions, reviewing requirements, uploading evidence, and submitting claims.

AI Functionality to be added soon!

## Features


- **Multi-step Form Process**:
  1. Condition Selection
  2. Requirements Review
  3. Document Upload
  4. Final Review
- **Interactive Chat Assistant**: AI assistant component to help guide users through the claims process
- **Document Management**: Easy drag-and-drop interface for uploading evidence documents
- **Progress Tracking**: Visual progress bar showing current step in the claims process
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 15
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Components**: shadcn/ui
- **Type Safety**: TypeScript


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Napsters-RH1/disability-ui
```

2. Install dependencies:
```bash
cd disability-ui
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Search and Select Conditions**
   - Use the search bar to find specific medical conditions
   - Click on conditions to select/deselect them
   - Selected conditions will be highlighted and tracked

2. **Review Requirements**
   - View required evidence for each selected condition
   - Get detailed information about documentation needs

3. **Upload Documents**
   - Drag and drop files or use the file browser
   - Support for multiple file uploads
   - Visual confirmation of uploaded files

4. **Review and Submit**
   - Final review of all selected conditions and uploaded documents
   - Submit claim when ready

## Key Components

### PermanentInput
A specialized input component that maintains focus during typing and search operations.

### ConditionsList
Displays filterable list of medical conditions with selection functionality.

### ChatAssistant
An AI-powered assistant that provides guidance and answers questions throughout the claims process.

### DocumentUpload
Handles file uploads with drag-and-drop support and progress tracking.

## State Management

The application uses React's built-in hooks for state management, with the main state logic centralized in the `useVAClaimsState` custom hook. This provides:

- Step tracking
- Condition selection
- Document management
- Search functionality

## Styling

The application uses Tailwind CSS for styling with a focus on:
- Clean, modern design
- Responsive layouts
- Consistent color scheme
- Accessible components

## Future Enhancements

- Helm/ArgoCD Deployment Option with Vector and Graph DB Backend
- Document -> vector db ingestion
- LLM chat capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Design inspired by VA.gov
- Icons provided by Lucide React
- UI components from shadcn/ui