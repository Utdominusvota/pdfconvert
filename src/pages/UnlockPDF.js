import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { unlockPDF } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const UnlockPDF = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUnlockPDF = async () => {
    if (!file) {
      addToast('Please upload a PDF file to unlock.', 'error');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const response = await unlockPDF(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'unlocked.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      addToast('PDF unlocked successfully!', 'success');
    } catch (error) {
      addToast('Error unlocking PDF. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Unlock PDF">
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUnlockPDF} disabled={isProcessing}>
        {isProcessing ? 'Unlocking...' : 'Unlock PDF'}
      </button>
      {isProcessing && <ProgressBar progress={progress} />}
    </ToolLayout>
  );
};

export default UnlockPDF;