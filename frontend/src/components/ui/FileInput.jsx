import React, { useState } from 'react';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-md shadow-md">
      <input
        type="file"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center p-4 space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span className="text-gray-500">Choose a file</span>
      </label>
      <span id="fileName" className="text-sm text-gray-500">
        {selectedFile ? selectedFile.name : ''}
      </span>
    </div>
  );
};

export default FileInput;
