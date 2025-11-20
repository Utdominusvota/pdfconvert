const BASE_URL = 'http://localhost:8000';

export const ENDPOINTS = {
  // PDF Conversion endpoints
  excelToPdf: `${BASE_URL}/convert/excel-to-pdf/`,
  pdfToExcel: `${BASE_URL}/convert/pdf-to-excel/`,
  pdfToJpg: `${BASE_URL}/convert/pdf-to-jpg/`,
  pdfToPptx: `${BASE_URL}/convert/pdf-to-pptx/`,
  pdfToWord: `${BASE_URL}/api/convert/pdf-to-docx`,
  pptxToPdf: `${BASE_URL}/convert/pptx-to-pdf/`,
  jpgToPdf: `${BASE_URL}/convert/jpg-to-pdf/`,
  mergePdfs: `${BASE_URL}/merge-pdfs/`,
  
  // PDF Manipulation endpoints
  unlockPdf: `${BASE_URL}/unlock_pdf`,
  organizePdf: `${BASE_URL}/organize_pdf`,
  repairPdf: `${BASE_URL}/repair_pdf`,
  addPageNumbers: `${BASE_URL}/add_page_numbers`,
  protectPdf: `${BASE_URL}/protect-pdf/`,
  splitPdf: `${BASE_URL}/split/`,
  signPdf: `${BASE_URL}/sign/pdf/`,
  watermarkPdf: `${BASE_URL}/watermark`,

  // PDF Tools endpoints
  redactPdf: `${BASE_URL}/redact-pdf`,
  scanPdf: `${BASE_URL}/scan_pdf`,
  comparePdfs: `${BASE_URL}/compare-pdfs`,
  cropPdf: `${BASE_URL}/crop-pdf`,

  // Newly added endpoints used by frontend
  rotatePdf: `${BASE_URL}/rotate`,
  pdfToPdfa: `${BASE_URL}/convert/pdf-to-pdfa/`
};

// Map tool names to their endpoints and required fields
export const TOOL_ENDPOINTS = {
  'Excel to PDF': {
    endpoint: ENDPOINTS.excelToPdf,
    fileType: '.xlsx',
    responseType: 'blob'
  },
  'PDF to Excel': {
    endpoint: ENDPOINTS.pdfToExcel,
    fileType: '.pdf',
    responseType: 'blob'
  },
  'PDF to JPG': {
    endpoint: ENDPOINTS.pdfToJpg,
    fileType: '.pdf',
    responseType: 'blob'
  },
  'PDF to PPTX': {
    endpoint: ENDPOINTS.pdfToPptx,
    fileType: '.pdf',
    responseType: 'blob'
  },
  'PDF to Word': {
    endpoint: ENDPOINTS.pdfToWord,
    fileType: '.pdf',
    responseType: 'blob'
  },
  'PPTX to PDF': {
    endpoint: ENDPOINTS.pptxToPdf,
    fileType: '.pptx',
    responseType: 'blob'
  },
  'JPG to PDF': {
    endpoint: ENDPOINTS.jpgToPdf,
    fileType: '.jpg,.jpeg',
    responseType: 'blob',
    multiple: true
  },
  // Add more tool mappings as needed
};

export const TOOL_GROUPS = {
  'Convert From PDF': ['PDF to Excel', 'PDF to JPG', 'PDF to PPTX', 'PDF to Word'],
  'Convert To PDF': ['Excel to PDF', 'PPTX to PDF', 'JPG to PDF'],
  'Organize PDF': ['Split PDF', 'Organize PDF', 'Add Page Numbers'],
  'Optimize PDF': ['Repair PDF', 'Crop PDF'],
  'Protect PDF': ['Protect PDF', 'Unlock PDF'],
  'Edit PDF': ['Sign PDF', 'Watermark PDF', 'Redact PDF', 'Rotate PDF'],
  'More Tools': ['Compare PDFs', 'Scan PDF']
};
