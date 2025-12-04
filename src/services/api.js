// Base URL for your FastAPI backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://194.147.95.217:8000';

// Maximum allowed upload size (50 MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

// simple per-tool error cache (UI can use these helpers to isolate errors per tool)
const toolErrorCache = new Map();
export const setToolError = (slug, message) => {
  if (!slug) return;
  toolErrorCache.set(slug, message);
};
export const getToolError = (slug) => {
  if (!slug) return null;
  return toolErrorCache.get(slug) || null;
};
export const clearToolError = (slug) => {
  if (!slug) return;
  toolErrorCache.delete(slug);
};

// helper to build full URL when endpoint may be absolute or relative
const buildUrl = (endpoint) => {
  if (!endpoint) return API_BASE_URL;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;
  // make sure there's a leading slash
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

// helper to extract filename from Content-Disposition header
const parseFilename = (contentDisposition) => {
  if (!contentDisposition) return null;
  const match = /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/i.exec(contentDisposition);
  return match ? decodeURIComponent(match[1]) : null;
};

// Generic file upload function using fetch
export const uploadFile = async (file, endpoint, onProgress, fieldName = 'file') => {
  if (!file) throw new Error('No file provided.');

  // client-side file size check
  if (file.size && file.size > MAX_FILE_SIZE) {
    throw new Error('File too large — maximum allowed size is 50 MB.');
  }

  const formData = new FormData();
  formData.append(fieldName, file);

  const url = buildUrl(endpoint); // moved out so we can reference it in errors
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    // If backend returned JSON
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (onProgress) onProgress(100);
      return data;
    }

    // Otherwise assume binary (file) response
    const blob = await response.blob();
    const cd = response.headers.get('content-disposition');
    const filename = parseFilename(cd) || (file && file.name ? file.name.replace(/\.[^.]+$/, '.pdf') : 'result.pdf');
    if (onProgress) onProgress(100);
    return { file: blob, filename };
  } catch (error) {
    // Provide clearer guidance for network/connection failures
    const isNetworkError = error instanceof TypeError && /Failed to fetch|NetworkError|NetworkError when attempting to fetch resource/i.test(error.message || '');
    if (isNetworkError) {
      const msg = `Failed to connect to ${url}. Is your backend running and reachable? Original error: ${error.message}`;
      console.error('Upload network error:', msg);
      throw new Error(msg);
    }
    console.error('Upload error:', error);
    throw error;
  }
};

// Multiple files upload function using fetch
export const uploadMultipleFiles = async (files, endpoint, onProgress, fieldName = 'files') => {
  if (!files || files.length === 0) throw new Error('No files provided.');

  // client-side size check for each file
  for (const file of files) {
    if (file.size && file.size > MAX_FILE_SIZE) {
      throw new Error('File too large — maximum allowed size is 50 MB.');
    }
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append(fieldName, file);
  });

  const url = buildUrl(endpoint);
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (onProgress) onProgress(100);
      return data;
    }

    const blob = await response.blob();
    const cd = response.headers.get('content-disposition');
    const filename = parseFilename(cd) || 'result.pdf';
    if (onProgress) onProgress(100);
    return { file: blob, filename };
  } catch (error) {
    const isNetworkError = error instanceof TypeError && /Failed to fetch|NetworkError/i.test(error.message || '');
    if (isNetworkError) {
      const msg = `Failed to connect to ${url}. Is your backend running and reachable? Original error: ${error.message}`;
      console.error('Upload network error:', msg);
      throw new Error(msg);
    }
    console.error('Upload error:', error);
    throw error;
  }
};

// Helper function to make API calls with fetch
const makeApiCall = async (endpoint, formData, onProgress) => {
  const url = buildUrl(endpoint);

  // Inspect FormData entries for files and validate size before sending
  if (formData && typeof formData.entries === 'function') {
    for (const [, value] of formData.entries()) {
      // In browser environment file objects are instances of File (or Blob)
      if (value instanceof File || (value && value.size !== undefined)) {
        const size = value.size || 0;
        if (size > MAX_FILE_SIZE) {
          throw new Error('File too large — maximum allowed size is 50 MB.');
        }
      }
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (onProgress) onProgress(100);
      return data;
    }

    const blob = await response.blob();
    const cd = response.headers.get('content-disposition');
    const filename = parseFilename(cd) || 'result.pdf';
    if (onProgress) onProgress(100);
    return { file: blob, filename };
  } catch (error) {
    const isNetworkError = error instanceof TypeError && /Failed to fetch|NetworkError/i.test(error.message || '');
    if (isNetworkError) {
      const msg = `Failed to connect to ${url}. Is your backend running and reachable? Original error: ${error.message}`;
      console.error('API call network error:', msg);
      throw new Error(msg);
    }
    console.error('API call error:', error);
    throw error;
  }
};

// PDF Tools API endpoints
export const pdfTools = {
  // Merge PDFs — use a correct endpoint or update as needed
  merge: (files, onProgress) => uploadMultipleFiles(files, 'http://127.0.0.1:8000/convert/excel-to-pdf/', onProgress),

  // Split PDF
  split: async (file, pages, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', pages);
    return makeApiCall('/split/', formData, onProgress);
  },

  // Compress PDF
  compress: async (file, level, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', level);
    return makeApiCall('/compress_pdf', formData, onProgress);
  },

  // Convert PDF to Word
  pdfToWord: (file, onProgress) => uploadFile(file, '/api/convert/pdf-to-docx', onProgress, 'file'),

  // Convert Word to PDF
  wordToPdf: (file, onProgress) => uploadFile(file, '/convert/', onProgress, 'doc_file'),

  // Convert PDF to Excel
  pdfToExcel: (file, onProgress) => uploadFile(file, '/convert/pdf-to-excel/', onProgress, 'pdf_file'),

  // Convert Excel to PDF
  excelToPdf: (file, onProgress) => uploadFile(file, '/convert/excel-to-pdf/', onProgress, 'excel_file'),

  // Convert PDF to JPG
  pdfToJpg: (file, onProgress) => uploadFile(file, '/convert/pdf-to-jpg/', onProgress, 'pdf_file'),

  // Convert JPG to PDF
  jpgToPdf: (files, onProgress) => uploadMultipleFiles(files, '/convert/jpg-to-pdf/', onProgress, 'image_files'),

  // Convert PDF to PowerPoint
  pdfToPowerPoint: (file, onProgress) => uploadFile(file, '/convert/pdf-to-pptx/', onProgress, 'pdf_file'),

  // Convert PowerPoint to PDF
  powerPointToPdf: (file, onProgress) => uploadFile(file, '/convert/pptx-to-pdf/', onProgress, 'pptx_file'),

  // Scan PDF (returns zip of images)
  scan: (file, format = 'png', onProgress) => {
    const formData = new FormData();
    formData.append('source_pdf', file);
    formData.append('image_format', format);
    return makeApiCall('/scan_pdf', formData, onProgress);
  },

  // OCR PDF
  ocr: (file, onProgress) => uploadFile(file, '/ocr_pdf', onProgress, 'source_pdf'),

  // Repair PDF
  repair: (file, onProgress) => uploadFile(file, '/repair_pdf', onProgress, 'corrupt_pdf'),

  // Rotate PDF (angle goes in query; makeApiCall will validate file size)
  rotate: async (file, angle, onProgress) => {
    const formData = new FormData();
    formData.append('source_pdf', file);
    // append angle as query parameter by passing endpoint with query
    return makeApiCall(`/rotate?angle=${encodeURIComponent(angle)}`, formData, onProgress);
  },

  // Watermark (two files)
  watermark: async (sourcePdfFile, watermarkFile, onProgress) => {
    const formData = new FormData();
    formData.append('source_pdf', sourcePdfFile);
    formData.append('watermark_file', watermarkFile);
    return makeApiCall('/watermark', formData, onProgress);
  },

  // Sign PDF (two files)
  sign: async (pdfFile, signatureFile, pageNumber, onProgress) => {
    const formData = new FormData();
    formData.append('pdf_file', pdfFile);
    formData.append('signature_file', signatureFile);
    formData.append('page_number', pageNumber);
    return makeApiCall('/sign/pdf/', formData, onProgress);
  },

  // Protect PDF
  protect: async (file, password, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);
    return makeApiCall('/protect-pdf/', formData, onProgress);
  },

  // Unlock PDF
  unlock: async (file, password, onProgress) => {
    const formData = new FormData();
    formData.append('protected_pdf', file);
    formData.append('password', password);
    return makeApiCall('/unlock_pdf', formData, onProgress);
  },

  // Organize PDF
  organize: async (file, order, onProgress) => {
    const formData = new FormData();
    formData.append('source_pdf', file);
    formData.append('page_order', order);
    return makeApiCall('/organize_pdf', formData, onProgress);
  },

  // Add page numbers
  addPageNumbers: (file, onProgress) => uploadFile(file, '/add_page_numbers', onProgress, 'source_pdf'),

  // Convert PDF to PDF/A
  pdfToPdfa: (file, onProgress) => uploadFile(file, '/convert/pdf-to-pdfa/', onProgress, 'file')
};

// Add named export expected by other modules (e.g. Merge page)
export const mergePDF = (files, onProgress) => pdfTools.merge(files, onProgress);

// Add named export expected by other modules (e.g. UnlockPDF.js)
export const unlockPDF = (file, password, onProgress) => pdfTools.unlock(file, password, onProgress);

// Add a small helper that frontend pages can call to upload a document.
// Default endpoint assumes FastAPI receives files at POST /api/documents/upload
// Change the endpoint string if your backend uses a different route.
export const uploadDocument = (file, endpoint = '/api/documents/upload', onProgress, fieldName = 'file') => {
  if (file && file.size > MAX_FILE_SIZE) {
    throw new Error('File too large — maximum allowed size is 50 MB.');
  }
  return uploadFile(file, endpoint, onProgress, fieldName);
};

// Simple in-memory cache to store per-tool upload results during the app session.
// Keyed by tool slug (e.g. 'merge-pdf', 'split-pdf'). This prevents merge results
// appearing in other tool pages.
const toolResultCache = new Map();

export const setToolResult = (slug, result) => {
  if (!slug) return;
  toolResultCache.set(slug, result);
};

export const getToolResult = (slug) => {
  if (!slug) return null;
  return toolResultCache.get(slug) || null;
};

export const clearToolResult = (slug) => {
  if (!slug) return;
  toolResultCache.delete(slug);
};

export const clearAllToolResults = () => {
  toolResultCache.clear();
};
