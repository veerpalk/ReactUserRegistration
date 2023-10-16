import React from 'react';
import errorImage from '../assets/error.jpg'
import './ErrorPage.css';

function ErrorPage({ errorMessage }) {
  return (
    <div className="error-container">
      <img src={errorImage} alt="Error 404" className="error-image" />
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;
