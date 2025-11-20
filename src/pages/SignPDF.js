import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const SignPDF = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      addToast('Please select a file to upload.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await uploadFile(file, 'sign-pdf', setProgress);
      addToast('File signed successfully!', 'success');
      // Handle file download or further processing here
    } catch (error) {
      addToast('Error signing the PDF. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout>
      <h2>Sign PDF</h2>
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Signing...' : 'Sign PDF'}
      </button>
      <ProgressBar progress={progress} />
    </ToolLayout>
  );
};

export default SignPDF;