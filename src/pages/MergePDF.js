import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const MergePDF = () => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const { addToast } = useToast();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      addToast('Please select a file to upload.', 'error');
      return;
    }

    try {
      const response = await uploadFile(file, setProgress);
      addToast('File merged successfully!', 'success');
      // Handle file download or further processing here
    } catch (error) {
      addToast('Error merging file. Please try again.', 'error');
    }
  };

  return (
    <ToolLayout title="Merge PDF">
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Merge PDF
      </button>
      <ProgressBar progress={progress} />
    </ToolLayout>
  );
};

export default MergePDF;