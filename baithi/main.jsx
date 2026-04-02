import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import component chính của chúng ta

// Render ứng dụng App vào thẻ div có id="root" trong file index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);