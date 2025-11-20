import { useState } from 'react';
import axios from 'axios';

const useUpload = (endpoint) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const uploadFile = async (file) => {
    setIsUploading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(endpoint, formData, {
        onUploadProgress: (event) => {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setProgress(percentCompleted);
        },
      });

      setDownloadUrl(response.data.downloadUrl);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    progress,
    isUploading,
    error,
    downloadUrl,
    uploadFile,
  };
};

export default useUpload;