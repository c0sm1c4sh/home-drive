import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_BACKEND_URL;

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/files`)
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this file?");
    if (!confirmed) return;

    const res = await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFiles(files.filter(file => file.id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div className="file-list">
      <h2>📂 Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-path">({file.s3_path})</span>
              <button className="delete-btn" onClick={() => handleDelete(file.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
