import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TOOL_CONFIG } from '../config/toolConfig';
import './ToolPage.css';
import { clearToolError } from '../services/api'; // added import

export default function ToolPage({ language }) {
  const { toolName } = useParams();
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [primaryFiles, setPrimaryFiles] = useState([]);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [params, setParams] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [download, setDownload] = useState(null);
  const [jsonResult, setJsonResult] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]); // State to store selected files

  // Clear local and cached per-tool errors when toolName changes or on unmount
  useEffect(() => {
    setError(null);
    setDownload(null);
    setJsonResult(null);
    // clear any cached error for this tool (prevents leakage)
    try { clearToolError(toolName); } catch (e) { /* ignore */ }

    return () => {
      // clear when unmounting the page
      try { clearToolError(toolName); } catch (e) { /* ignore */ }
    };
  }, [toolName]);

  // Resolve config: exact, dash<->underscore, or endpoint contains name
  const findConfig = (name) => {
    if (!name) return null;

    // Check for exact match in TOOL_CONFIG
    if (TOOL_CONFIG[name]) return TOOL_CONFIG[name];

    // Handle alternate formats (dash <-> underscore)
    const alt1 = name.replace(/-/g, '_');
    if (TOOL_CONFIG[alt1]) return TOOL_CONFIG[alt1];
    const alt2 = name.replace(/_/g, '-');
    if (TOOL_CONFIG[alt2]) return TOOL_CONFIG[alt2];

    // Handle French slugs (e.g., "fusionner-pdf" -> "merge-pdf")
    const frenchToEnglishMap = {
      'fusionner-pdf': 'merge-pdf',
      'diviser-pdf': 'split-pdf',
      'compresser-pdf': 'compress-pdf',
    };
    if (frenchToEnglishMap[name]) return TOOL_CONFIG[frenchToEnglishMap[name]];

    // Check if the endpoint contains the name
    const found = Object.values(TOOL_CONFIG).find((c) => c.endpoint && c.endpoint.includes(name));
    return found || null;
  };

  const cfg = findConfig(toolName);

  const handlePrimaryChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setPrimaryFiles(files);
    setError(null);
  };

  const handleSecondaryChange = (e) => {
    setSecondaryFile(e.target.files?.[0] || null);
  };

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams(p => ({ ...p, [name]: value }));
  };

  const buildUrlWithQuery = (baseUrl, cfgParams) => {
    // cfgParams: object of key->value for parameters that should be in query
    const queryPairs = Object.entries(cfgParams).filter(([k, v]) => v !== undefined && v !== '');
    if (queryPairs.length === 0) return baseUrl;
    const q = queryPairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    return baseUrl + (baseUrl.includes('?') ? '&' : '?') + q;
  };

  const handleUpload = async () => {
    setError(null);
    setJsonResult(null);
    setDownload(null);

    if (!cfg) {
      setError('No frontend configuration for this tool. Add it to src/config/toolConfig.js.');
      return;
    }

    // Validate files
    if (!cfg.allowNoFile && !cfg.requiresTwoFiles && (!primaryFiles || primaryFiles.length === 0)) {
      setError('Please select a file to upload.');
      return;
    }
    if (cfg.requiresTwoFiles && (!primaryFiles || primaryFiles.length === 0 || !secondaryFile)) {
      setError('Please select both primary and secondary files.');
      return;
    }

    // Separate params into query vs form
    const queryParams = {};
    const formParams = {};

    (cfg.parameters || []).forEach(p => {
      const val = params[p.name];
      const sendAs = p.sendAs || 'form';
      if (sendAs === 'query') {
        if (val !== undefined && val !== '') queryParams[p.name] = val;
      } else {
        if (val !== undefined) formParams[p.name] = val;
      }
    });

    // Build FormData
    const formData = new FormData();

    try {
      if (cfg.requiresTwoFiles) {
        const firstName = cfg.uploadFieldNames?.first || 'file_a';
        const secondName = cfg.uploadFieldNames?.second || 'file_b';
        formData.append(firstName, primaryFiles[0]);
        formData.append(secondName, secondaryFile);
      } else if (cfg.acceptMultiple) {
        const field = cfg.uploadFieldName || 'files';
        primaryFiles.forEach(f => formData.append(field, f));
      } else {
        const field = cfg.uploadFieldName || 'file';
        if (primaryFiles.length === 0) throw new Error('Please select a file.');
        formData.append(field, primaryFiles[0]);
      }

      // Append form params
      Object.entries(formParams).forEach(([k, v]) => formData.append(k, v));
    } catch (err) {
      setError(err.message || 'Validation failed');
      return;
    }

    // Build final URL (append query params)
    const url = buildUrlWithQuery(cfg.endpoint, queryParams);

    setUploading(true);
    try {
      const resp = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'arraybuffer',
        validateStatus: s => s >= 200 && s < 500
      });

      const contentType = resp.headers['content-type'] || '';

      // try parse filename
      let filename = 'result';
      const cd = resp.headers['content-disposition'];
      if (cd) {
        const m = cd.match(/filename\*=UTF-8''(.+)|filename="?(?<name>[^"]+)"?/);
        if (m) filename = decodeURIComponent(m[1] || (m.groups && m.groups.name) || filename);
      }

      if (contentType.includes('application/json')) {
        const text = new TextDecoder('utf-8').decode(resp.data);
        setJsonResult(JSON.parse(text));
      } else {
        const blob = new Blob([resp.data], { type: contentType || 'application/octet-stream' });
        const blobUrl = window.URL.createObjectURL(blob);
        setDownload({ url: blobUrl, filename });
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const labels = {
    fr: {
      notFound: 'Outil introuvable',
      notFoundDesc: 'L\'outil demandé "{toolName}" n\'a pas encore de configuration frontend. Ajoutez-le à src/config/toolConfig.js.',
      primary: 'Fichier principal',
      secondary: 'Fichier secondaire',
      selected: 'Sélectionné :',
      options: 'Options',
      upload: uploading ? 'Traitement...' : 'Télécharger & Traiter',
      download: 'Télécharger',
      error: 'Erreur',
    },
    en: {
      notFound: 'Tool not found',
      notFoundDesc: 'The requested tool "{toolName}" has no frontend configuration yet. Add it to src/config/toolConfig.js.',
      primary: 'Primary file',
      secondary: 'Secondary file',
      selected: 'Selected:',
      options: 'Options',
      upload: uploading ? 'Processing...' : 'Upload & Process',
      download: 'Download',
      error: 'Error',
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // Update the state with selected files
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove file by index
  };

  if (toolName === 'merge-pdf' || toolName === 'fusionner-pdf') {
    const handleMergeUpload = async () => {
      setError(null);
      setDownload(null);

      // Validate that at least two PDF files are selected
      if (selectedFiles.length < 2) {
        setError(language === 'fr' ? 'Veuillez sélectionner au moins deux fichiers PDF.' : 'Please select at least two PDF files.');
        return;
      }

      // Ensure all files are PDFs
      if (!selectedFiles.every(file => file.name.endsWith('.pdf'))) {
        setError(language === 'fr' ? 'Tous les fichiers doivent être au format PDF.' : 'All files must be in PDF format.');
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file); // Append each file to the FormData
      });

      setUploading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/merge-pdfs/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);
        const filename = 'merged_document.pdf';

        setDownload({ url: blobUrl, filename });
      } catch (err) {
        setError(err.response?.data?.detail || (language === 'fr' ? 'Échec de la fusion des fichiers PDF.' : 'Failed to merge PDF files.'));
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="tool-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <header className="tool-header" style={{ textAlign: 'center' }}>
          <h1>{language === 'fr' ? 'Fusionner des PDF' : 'Merge PDF'}</h1>
          <p>
            {language === 'fr'
              ? 'Combinez plusieurs fichiers PDF en un seul document dans l\'ordre souhaité.'
              : 'Combine multiple PDF files into one document in the desired order.'}
          </p>
        </header>

        <main className="tool-main" style={{ width: '100%', maxWidth: '500px' }}>
          <div id="main-content" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <label className="tp-label">{language === 'fr' ? 'Fichiers PDF' : 'PDF Files'}</label>
            <input
              className="tp-input-file"
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
            />
            {selectedFiles.length > 0 && (
              <div className="tp-selected">
                <strong>{language === 'fr' ? 'Sélectionné :' : 'Selected:'}</strong>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside id="settings-panel" style={{ textAlign: 'center' }}>
            <button
              className="action-button"
              disabled={selectedFiles.length < 2 || uploading}
              onClick={handleMergeUpload}
              style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              {uploading
                ? language === 'fr'
                  ? 'Fusion en cours...'
                  : 'Merging...'
                : language === 'fr'
                ? 'Fusionner les PDF'
                : 'Merge PDF'}
            </button>
          </aside>
        </main>

        {error && <div className="tp-error" style={{ marginTop: '20px', color: 'red' }}>{error}</div>}

        {download && (
          <div style={{ marginTop: '20px' }}>
            <a href={download.url} download={download.filename} className="tp-download" style={{ color: 'blue', textDecoration: 'underline' }}>
              {language === 'fr' ? 'Télécharger le fichier' : 'Download File'}
            </a>
          </div>
        )}
      </div>
    );
  }

  if (!cfg) {
    return (
      <div style={{ padding: 24 }}>
        <h2>{labels[language].notFound}</h2>
        <p>{labels[language].notFoundDesc.replace('{toolName}', toolName)}</p>
      </div>
    );
  }

  const title = (toolName || '').split(/[-_]/).map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');

  return (
    <div className="tool-page" style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      {cfg.description && <p style={{ color: '#556777' }}>{cfg.description}</p>}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="tp-label">{labels[language].primary}</label>
          <input className="tp-input-file"
            type="file"
            accept={cfg.fileTypes || '*/*'}
            onChange={handlePrimaryChange}
            multiple={!!cfg.acceptMultiple}
          />
          {primaryFiles.length > 0 && (
            <div className="tp-selected">
              <strong>{labels[language].selected}</strong>
              <ul>
                {primaryFiles.map(f => <li key={f.name}>{f.name}</li>)}
              </ul>
            </div>
          )}
        </div>

        {cfg.requiresTwoFiles && (
          <div style={{ flex: 1, minWidth: 280 }}>
            <label className="tp-label">{cfg.secondaryFileLabel || labels[language].secondary}</label>
            <input className="tp-input-file" type="file" accept={cfg.fileTypes || '*/*'} onChange={handleSecondaryChange} />
            {secondaryFile && <div className="tp-selected">{secondaryFile.name}</div>}
          </div>
        )}
      </div>

      {(cfg.parameters || []).length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h4>{labels[language].options}</h4>
          {(cfg.parameters || []).map(p => (
            <div key={p.name} className="tp-param-row">
              <label className="tp-param-label">{p.label || p.name} {p.sendAs === 'query' && <em className="tp-query-note">(sent in URL)</em>}</label>
              {p.type === 'select' ? (
                <select name={p.name} defaultValue={p.defaultValue || ''} onChange={handleParamChange} className="tp-select">
                  {(p.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  className="tp-input"
                  type={p.type || 'text'}
                  name={p.name}
                  placeholder={p.placeholder || ''}
                  onChange={handleParamChange}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
        <button onClick={handleUpload} disabled={uploading} className="tp-button">
          {labels[language].upload}
        </button>
      </div>

      {error && <div className="tp-error">{labels[language].error}: {error}</div>}

      {download && (
        <div style={{ marginTop: 12 }}>
          <a href={download.url} download={download.filename} className="tp-download">
            {labels[language].download} {download.filename}
          </a>
        </div>
      )}

      {jsonResult && (
        <div className="tp-json">
          <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
