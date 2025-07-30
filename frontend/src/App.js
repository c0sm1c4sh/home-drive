import React from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Drive Clone</h1>
      <FileUpload />
      <hr />
      <FileList />
    </div>
  );
}

export default App;
