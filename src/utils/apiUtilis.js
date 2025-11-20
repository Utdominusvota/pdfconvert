import axios from 'axios';
import { TOOL_ENDPOINTS } from '../config/endpoints';

export const uploadFile = async (toolName, files, additionalParams = {}) => {
  const toolConfig = TOOL_ENDPOINTS[toolName];
  if (!toolConfig) {
    throw new Error(`No endpoint configured for tool: ${toolName}`);
  }

  const formData = new FormData();
  
  if (toolConfig.multiple && Array.isArray(files)) {
    files.forEach(file => {
      formData.append('files', file);
    });
  } else {
    formData.append('file', files[0]);
  }

  // Add any additional parameters to the form data
  Object.entries(additionalParams).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await axios({
      method: 'POST',
      url: toolConfig.endpoint,
      data: formData,
      responseType: toolConfig.responseType || 'json',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
