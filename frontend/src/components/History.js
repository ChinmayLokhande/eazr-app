import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';
import dogLogo from '../dogLogo.png'


function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('https://eazr-backend.onrender.com/history')
      .then(response => {
        setHistory(response.data.history);
      })
      .catch(error => {
        console.error('Error fetching image history:', error);
      });
  }, []);

  return (
    <div className="history-container">
      <nav>
        <div className="nav-left">
          <img src={dogLogo} alt="Dog Logo" className="logo" />
          <h2>Image History</h2>
        </div>
        <div className='nav-right'>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/history">History</a></li>
            <li><a href="/add-to-cart">Add to Cart</a></li>
          </ul>
        </div>
      </nav>
      <div className="content">
        
        <ul className="image-list">
          {history.map((imageUrl, index) => (
            <li key={index}>
              <img src={imageUrl} alt={`History Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
