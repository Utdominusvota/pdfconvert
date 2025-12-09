const BASE_URL = '/api';

export const TOOL_CONFIG = {
  'excel-to-pdf': {
    endpoint: `${BASE_URL}/convert/excel-to-pdf/`,
    acceptMultiple: false,
    fileTypes: '.xlsx,.xls',
    uploadFieldName: 'excel_file',
    description: 'Convert Excel spreadsheets to PDF format'
  },
  'pdf-to-excel': {
    endpoint: `${BASE_URL}/convert/pdf-to-excel/`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'pdf_file',
    description: 'Convert PDF to Excel spreadsheet'
  },
  'pdf-to-jpg': {
    endpoint: `${BASE_URL}/convert/pdf-to-jpg/`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'pdf_file',
    parameters: [
      {
        name: 'image_format',
        type: 'select',
        label: 'Image Format',
        options: ['jpg', 'png'],
        defaultValue: 'jpg'
      }
    ]
  },
  'jpg-to-pdf': {
    endpoint: `${BASE_URL}/convert/jpg-to-pdf/`,
    acceptMultiple: true,
    fileTypes: '.jpg,.jpeg',
    uploadFieldName: 'image_files',
    description: 'Convert JPG images to PDF'
  },
  'compare-pdfs': {
    endpoint: `${BASE_URL}/compare-pdfs`,
    requiresTwoFiles: true,
    fileTypes: '.pdf',
    uploadFieldNames: {
      first: 'file_a',
      second: 'file_b'
    },
    description: 'Compare two PDF documents'
  },
  'watermark-pdf': {
    endpoint: `${BASE_URL}/watermark`,
    requiresTwoFiles: true,
    fileTypes: '.pdf',
    uploadFieldNames: {
      first: 'source_pdf',
      second: 'watermark_file'
    },
    secondaryFileLabel: 'Watermark PDF',
    description: 'Add watermark to PDF'
  },
  'protect-pdf': {
    endpoint: `${BASE_URL}/protect-pdf/`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file',
    parameters: [
      {
        name: 'password',
        type: 'password',
        label: 'Set Password',
        required: true
      }
    ]
  },
  'unlock-pdf': {
    endpoint: `${BASE_URL}/unlock_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'protected_pdf',
    parameters: [
      {
        name: 'password',
        type: 'password',
        label: 'PDF Password',
        required: true
      }
    ]
  },
  'organize-pdf': {
    endpoint: `${BASE_URL}/organize_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    parameters: [
      {
        name: 'page_order',
        type: 'text',
        label: 'Page Order',
        placeholder: 'e.g., 1,3,5-7',
        required: true
      }
    ]
  },
  'merge-pdf': {
    endpoint: `${BASE_URL}/merge_pdf`,
    acceptMultiple: true,
    fileTypes: '.pdf',
    uploadFieldName: 'files',
    description: 'Combine multiple PDFs into one'
  },
  'fusionner-pdf': {
    endpoint: `${BASE_URL}/merge_pdf`, // Same endpoint as "merge-pdf"
    acceptMultiple: true,
    fileTypes: '.pdf',
    uploadFieldName: 'files',
    description: 'Combinez plusieurs fichiers PDF en un seul document' // French description
  },
  'split-pdf': {
    endpoint: `${BASE_URL}/split`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'pdf_file',
    parameters: [
      {
        name: 'pages',
        type: 'text',
        label: 'Page Range',
        placeholder: 'e.g., 1,3,5-7',
        required: true
      }
    ]
  },
  'compress-pdf': {
    endpoint: `${BASE_URL}/compress_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file'
  },
  'crop-pdf': {
    endpoint: `${BASE_URL}/crop-pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file',
    parameters: [
      { name: 'left_margin_pc', type: 'number', label: 'Left Margin (%)', placeholder: '0', required: false },
      { name: 'top_margin_pc', type: 'number', label: 'Top Margin (%)', placeholder: '0', required: false },
      { name: 'right_margin_pc', type: 'number', label: 'Right Margin (%)', placeholder: '0', required: false },
      { name: 'bottom_margin_pc', type: 'number', label: 'Bottom Margin (%)', placeholder: '0', required: false },
      { name: 'page_number', type: 'number', label: 'Page Number (optional)', placeholder: 'Leave empty for all pages', required: false }
    ],
    description: 'Crop margins from PDF document(s) by percentage'
  },
  'add-page-numbers': {
    endpoint: `${BASE_URL}/add_page_numbers`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    description: 'Add sequential page numbers to every page'
  },
  'scan-to-pdf': {
    endpoint: `${BASE_URL}/convert/jpg-to-pdf/`,
    acceptMultiple: true,
    fileTypes: '.jpg,.jpeg,.png',
    uploadFieldName: 'image_files',
    description: 'Scan images (JPG/PNG) and merge into a single PDF'
  },
  'extract-pages': {
    endpoint: `${BASE_URL}/split`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'pdf_file',
    parameters: [
      { name: 'pages', type: 'text', label: 'Page Range', placeholder: 'e.g., 1,3,5-7', required: true }
    ],
    description: 'Extract specific pages from a PDF'
  },
  'remove-pages': {
    endpoint: `${BASE_URL}/organize_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    parameters: [
      { name: 'page_order', type: 'text', label: 'Pages to keep (omit pages to remove)', placeholder: 'e.g., 1,3,5-7', required: true }
    ],
    description: 'Remove pages by providing the desired page order (omit pages you want removed)'
  },
  'ocr-pdf': {
    endpoint: `${BASE_URL}/ocr_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    description: 'Perform OCR on scanned PDF to make it searchable'
  },
  'repair-pdf': {
    endpoint: `${BASE_URL}/repair_pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'corrupt_pdf',
    description: 'Attempt to repair a corrupted PDF file'
  },
  'word-to-pdf': {
    endpoint: `${BASE_URL}/convert/`,
    acceptMultiple: false,
    fileTypes: '.doc,.docx',
    uploadFieldName: 'doc_file',
    description: 'Convert Word document (.doc/.docx) to PDF'
  },
  'powerpoint-to-pdf': {
    endpoint: `${BASE_URL}/convert/pptx-to-pdf/`,
    acceptMultiple: false,
    fileTypes: '.pptx',
    uploadFieldName: 'pptx_file',
    description: 'Convert PowerPoint (.pptx) to PDF'
  },
  'pdf-to-word': {
    endpoint: `${BASE_URL}/api/convert/pdf-to-docx`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file',
    description: 'Convert PDF to editable Word (DOCX)'
  },
  'pdf-to-powerpoint': {
    endpoint: `${BASE_URL}/convert/pdf-to-pptx/`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'pdf_file',
    description: 'Convert PDF pages to a PowerPoint presentation'
  },
  'redact-pdf': {
    endpoint: `${BASE_URL}/redact-pdf`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file',
    parameters: [
      { name: 'terms', type: 'text', label: 'Redaction Terms', placeholder: 'Comma-separated (e.g., SSN,Address)', required: true }
    ],
    description: 'Redact specified terms from a PDF'
  },
  'sign-pdf': {
    endpoint: `${BASE_URL}/sign/pdf/`,
    requiresTwoFiles: true,
    fileTypes: '.pdf,.jpg,.png',
    uploadFieldNames: { first: 'pdf_file', second: 'signature_file' },
    parameters: [
      { name: 'page_number', type: 'number', label: 'Page Number', placeholder: '1-based page index', required: true }
    ],
    description: 'Stamp a signature image onto a specific page of a PDF'
  },
  'edit-pdf': {
    endpoint: `${BASE_URL}/rotate`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    parameters: [
      { name: 'angle', type: 'select', label: 'Rotate Angle', options: [90, 180, 270], defaultValue: 90, required: true, sendAs: 'query' }
    ],
    description: 'Quick edits such as rotating pages'
  },
  'rotate-pdf': {
    endpoint: `${BASE_URL}/rotate`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'source_pdf',
    parameters: [
      { name: 'angle', type: 'select', label: 'Rotate Angle', options: [90, 180, 270], defaultValue: 90, required: true, sendAs: 'query' }
    ],
    description: 'Rotate PDF pages (angle is sent as query parameter)'
  },
  'pdf-to-pdfa': {
    endpoint: `${BASE_URL}/convert/pdf-to-pdfa/`,
    acceptMultiple: false,
    fileTypes: '.pdf',
    uploadFieldName: 'file',
    description: 'Convert PDF to PDF/A archival format'
  },
  'add-watermark': {
    endpoint: `${BASE_URL}/watermark`,
    requiresTwoFiles: true,
    fileTypes: '.pdf',
    uploadFieldNames: {
      first: 'source_pdf',
      second: 'watermark_file'
    },
    secondaryFileLabel: 'Watermark PDF',
    description: 'Add a watermark to your PDF by overlaying text or an image.'
  }

  // Add more tool configurations as needed
};
