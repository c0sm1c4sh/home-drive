import React, { useEffect, useState } from 'react';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this file?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFiles(files.filter(file => file.id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id} style={{ marginBottom: "10px" }}>
              {file.name} ({file.s3_path}){" "}
              <button onClick={() => handleDelete(file.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
