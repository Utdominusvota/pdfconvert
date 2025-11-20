import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const ProtectPDF = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      addToast('Please select a file to upload.', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await uploadFile(file, 'protect', setProgress);
      addToast('File protected successfully!', 'success');
      // Handle file download or further processing here
    } catch (error) {
      addToast('Error protecting file. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout>
      <h2>Protect PDF</h2>
      <p>Upload your PDF file to protect it with a password.</p>
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? 'Protecting...' : 'Protect PDF'}
      </button>
      <ProgressBar progress={progress} />
    </ToolLayout>
  );
};

export default ProtectPDF;