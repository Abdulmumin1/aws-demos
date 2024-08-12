import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { rekognition } from "./aws.config";
import "./App.css";
import Spinner from "./Spinner";

function App() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setResults(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageBytes = new Uint8Array(event.target.result);

      try {
        const data = await rekognition
          .detectLabels({
            Image: { Bytes: imageBytes },
            MaxLabels: 10,
            MinConfidence: 70,
          })
          .promise();

        const textData = await rekognition
          .detectText({
            Image: { Bytes: imageBytes },
          })
          .promise();

        setResults({ labels: data.Labels, text: textData.TextDetections });
      } catch (error) {
        console.error("Error analyzing image:", error);
        alert("Error analyzing image. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(image);
  };

  return (
    <div className="App">
      <h1>Image Analyzer</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="uploaded-image"
          />
          <button onClick={analyzeImage} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>
      )}
      {loading && <Spinner />}
      {results && (
        <div className="results">
          <h2>Analysis Results</h2>
          <div className="result-section">
            <h3>Labels</h3>
            <ul>
              {results.labels.map((label, index) => (
                <li key={index}>
                  {label.Name} - Confidence: {label.Confidence.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3>Detected Text</h3>
            <ul>
              {results.text
                .filter((item) => item.Type === "LINE")
                .map((textItem, index) => (
                  <li key={index}>{textItem.DetectedText}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
