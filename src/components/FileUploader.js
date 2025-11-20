import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './FileUploader.css';

export default function FileUploader({ toolConfig }) {
  const [files, setFiles] = useState({
    primary: null,
    secondary: null
  });
  const [parameters, setParameters] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles, type = 'primary') => {
    setFiles(prev => ({
      ...prev,
      [type]: acceptedFiles
    }));
    setError(null);
  };

  const { getRootProps: getPrimaryRootProps, getInputProps: getPrimaryInputProps } = useDropzone({
    onDrop: files => onDrop(files, 'primary'),
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
    multiple: toolConfig.acceptMultiple
  });

  const { getRootProps: getSecondaryRootProps, getInputProps: getSecondaryInputProps } = useDropzone({
    onDrop: files => onDrop(files, 'secondary'),
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleParameterChange = (e) => {
    setParameters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setUploading(true);
    setError(null);
    
    const formData = new FormData();

    // Add primary file(s)
    if (toolConfig.acceptMultiple && files.primary) {
      files.primary.forEach(file => {
        formData.append(toolConfig.uploadFieldName, file);
      });
    } else if (files.primary) {
      formData.append(toolConfig.uploadFieldName, files.primary[0]);
    }

    // Add secondary file if required
    if (toolConfig.requiresTwoFiles && files.secondary) {
      formData.append(toolConfig.uploadFieldNames.second, files.secondary[0]);
    }

    // Add parameters
    Object.entries(parameters).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post(toolConfig.endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob'
      });

      // Handle successful response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setResult(url);
      setUploading(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
      setUploading(false);
    }
  };

  return (
    <div className="uploader-container">
      <div className="upload-section">
        <div {...getPrimaryRootProps()} className="dropzone">
          <input {...getPrimaryInputProps()} />
          <p>Drop {toolConfig.acceptMultiple ? 'files' : 'file'} here or click to select</p>
        </div>
        
        {toolConfig.requiresTwoFiles && (
          <div {...getSecondaryRootProps()} className="dropzone secondary">
            <input {...getSecondaryInputProps()} />
            <p>Drop {toolConfig.secondaryFileLabel || 'secondary file'} here</p>
          </div>
        )}

        {files.primary && (
          <div className="selected-files">
            <h4>Selected Files:</h4>
            <ul>
              {files.primary.map(file => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {toolConfig.parameters && (
          <div className="parameters">
            {toolConfig.parameters.map(param => (
              <div key={param.name} className="parameter-field">
                <label>{param.label}:</label>
                {param.type === 'select' ? (
                  <select
                    name={param.name}
                    onChange={handleParameterChange}
                    defaultValue={param.defaultValue}
                  >
                    {param.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={param.type}
                    name={param.name}
                    placeholder={param.placeholder}
                    required={param.required}
                    onChange={handleParameterChange}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          disabled={!files.primary || uploading}
          className="upload-button"
        >
          {uploading ? 'Processing...' : 'Process Files'}
        </button>

        {error && <div className="error-message">{error}</div>}
        
        {result && (
          <div className="result-section">
            <a 
              href={result} 
              download="processed-file"
              className="download-button"
            >
              Download Result
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
