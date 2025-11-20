import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const ConvertPDF = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');
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
      setDownloadUrl(response.data.downloadUrl);
      addToast('File converted successfully!', 'success');
    } catch (error) {
      addToast('Error converting file. Please try again.', 'error');
    }
  };

  return (
    <ToolLayout>
      <h2>Convert PDF</h2>
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload}>Convert</button>
      {progress > 0 && <ProgressBar progress={progress} />}
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Converted PDF
        </a>
      )}
    </ToolLayout>
  );
};

export default ConvertPDF;