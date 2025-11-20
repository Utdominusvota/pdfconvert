import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout/ToolLayout';
import FileUploader from '../components/FileUploader/FileUploader';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { uploadFile } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const SplitPDF = () => {
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
      const response = await uploadFile(file, 'split', setProgress);
      setDownloadUrl(response.data.downloadUrl);
      addToast('File split successfully!', 'success');
    } catch (error) {
      addToast('Error splitting the file. Please try again.', 'error');
    }
  };

  return (
    <ToolLayout title="Split PDF">
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Split PDF
      </button>
      {progress > 0 && <ProgressBar progress={progress} />}
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Split PDF
        </a>
      )}
    </ToolLayout>
  );
};

export default SplitPDF;