import React, { useState } from 'react';
import './App.css';

function App() {
  const [ image, setImage ] = useState("http://fakeimg.pl/350x200/")
  const [ saveImage, setSaveImage ] = useState(null)

  function handleUploadChange(e) {
    console.log(e.target.files[0])
    let uploaded = e.target.files[0]
    setImage(URL.createObjectURL(uploaded))
    setSaveImage(uploaded)
  }

  function uploadImage() {
    if(!saveImage) {
      alert("gambar belum diupload")
    } else {
      
      let formData = new FormData()
      formData.append("photo", saveImage)

      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === "success") {
          window.location.href = data.image
        }
      })
    }
  }

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img
                src={"http://fakeimg.pl/350x200"}
                className="img-thumbnail"
                alt=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Image Here
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={handleUploadChange}
                accept="image/*"
              />
            </div>
            <div className="d-grid">
              <button onClick={uploadImage} className="btn btn-primary w-100 mt-2">Save My Photo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
