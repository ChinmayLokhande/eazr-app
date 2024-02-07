import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';
import dogLogo from '../dogLogo.png'


function Home() {
  const [imageUrl, setImageUrl] = useState('');

  const fetchRandomDogImage = () => {
    axios.get('http://localhost:5000/random-dog-image')
      .then(response => {
        setImageUrl(response.data.imageUrl);
      })
      .catch(error => {
        console.error('Error fetching random dog image:', error);
      });
  };

  return (
    <div className="home-container">
      <nav>
        <div className="nav-left">
          <img src={dogLogo} alt="Dog Logo" className="logo" />
          <h2>Random Dog Image</h2>
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
        <button onClick={fetchRandomDogImage}>Fetch Doggo!</button>
        <div className="image-container">
          {imageUrl && <img src={imageUrl} alt="Random Dog" />}
        </div>
        
      </div>
    </div>
  );
}

export default Home;
