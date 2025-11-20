import React, { useState } from 'react';
import './FileUploader.css';

const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    }
  };

  return (
    <div
      className={`file-uploader ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="upload-area">
        {file ? (
          <p className="file-name">{file.name}</p>
        ) : (
          <p>Drag & drop your PDF file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;