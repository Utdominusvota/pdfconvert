import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const CompressPDF = () => {
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
    setProgress(0);

    try {
      const response = await uploadFile(file, 'compress', (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      });

      addToast('File compressed successfully!', 'success');
      // Handle file download or further processing here
    } catch (error) {
      addToast('Error compressing file. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Compress PDF">
      <FileUploader onFileChange={handleFileChange} />
      {isProcessing && <ProgressBar progress={progress} />}
      <button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? 'Compressing...' : 'Compress PDF'}
      </button>
    </ToolLayout>
  );
};

export default CompressPDF;