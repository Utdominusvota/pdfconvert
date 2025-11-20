import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const WatermarkPDF = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      addToast('Please select a file to upload.', 'error');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const response = await uploadFile(file, 'watermark', (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      });

      addToast('Watermark added successfully!', 'success');
      // Handle file download or display link here
    } catch (error) {
      addToast('Error adding watermark. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Add Watermark to PDF">
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Processing...' : 'Add Watermark'}
      </button>
      <ProgressBar progress={progress} />
    </ToolLayout>
  );
};

export default WatermarkPDF;