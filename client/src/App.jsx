import React, { useState } from 'react';

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedSingleFile, setFetchedSingleFile] = useState(null);
  const [dogImage, setDogImage] = useState(null); 


  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };
  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files);
  };

 
  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append('file', singleFile);

    try {
      const response = await fetch('http://localhost:8000/save/single', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error uploading single file:', error);
    }
  };

  // Upload multiple files to the server
  const uploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i]);
    }

    try {
      const response = await fetch('http://localhost:8000/save/multiple', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
    }
  };

  // Fetch a random single file from the server
  const fetchSingleFile = async () => {
    try {
      const response = await fetch('http://localhost:8000/fetch/single');
      console.log (response)
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFetchedSingleFile(url);
    } catch (error) {
      console.error('Error fetching single file:', error);
    }
  };

  
  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message); 
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

 
  const uploadDogImage = async () => {
    if (!dogImage) return;

    try {
      const response = await fetch("http://localhost:8000/save/dog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: dogImage }),
      });
      const data = await response.json();
      alert("Dog image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading dog image:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload and Fetch App</h1>

      
      <div>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      <div>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
      </div>

   
      <div>
        <h2>Fetch Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {fetchedSingleFile && (
          <div>
            <h3>Single File</h3>
            <img src={fetchedSingleFile} alt="Fetched Single" style={{ width: '200px', marginTop: '10px' }} />
          </div>
        )}
      </div>

 
      <div>
        <h2>Fetch Random Dog Image</h2>
        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        {dogImage && (
          <div>
            <img src={dogImage} alt="Random Dog" style={{ width: '300px', marginTop: '10px' }} />
            <button onClick={uploadDogImage} style={{ marginTop: '10px' }}>Upload Dog Image</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
