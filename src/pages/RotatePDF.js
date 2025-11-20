import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const RotatePDF = () => {
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
      const response = await uploadFile(file, 'rotate', (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      });

      if (response.status === 200) {
        const downloadUrl = response.data.downloadUrl;
        addToast('File rotated successfully!', 'success');
        window.open(downloadUrl, '_blank');
      } else {
        addToast('Failed to rotate the file. Please try again.', 'error');
      }
    } catch (error) {
      addToast('An error occurred during the upload. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Rotate PDF">
      <FileUploader onFileChange={handleFileChange} />
      <ProgressBar progress={progress} loading={loading} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Rotating...' : 'Rotate PDF'}
      </button>
    </ToolLayout>
  );
};

export default RotatePDF;