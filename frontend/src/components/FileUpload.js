import React, { useState } from 'react';

const API_BASE = process.env.REACT_APP_BACKEND_URL;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("Upload successful!");
        window.location.reload();
      } else {
        setStatus("Upload failed");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="upload-section">
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} className="upload-btn">Upload</button>
      <p className="status-msg">{status}</p>
    </div>
  );
};

export default FileUpload;
