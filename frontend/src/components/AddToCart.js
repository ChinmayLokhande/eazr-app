import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddToCart.css';
import dogLogo from '../dogLogo.png'

function AddToCart() {
  const [dog, setDog] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('https://eazr-backend.onrender.com/cart')
      .then(response => {
        setCartItems(response.data.cart);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const addToCart = () => {
    axios.post('https://eazr-backend.onrender.com/add-to-cart', { imageUrl: dog, price })
      .then(response => {
        setMessage(response.data.message);
        setCartItems([...cartItems, { imageUrl: dog, price }]);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        setMessage('Error adding to cart. Please try again.');
      });
  };

  return (
    <div className="add-to-cart-container">
      <nav>
        <div className="nav-left">
          <img src={dogLogo} alt="Dog Logo" className="logo" />
          <h2>Cart</h2>
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
        <input
          type="text"
          placeholder="Dog Breed"
          value={dog}
          onChange={e => setDog(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={addToCart}>Add to Cart</button>
        {message && <p>{message}</p>}
        <h3>Cart Items</h3>
        <div className="table-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Dog Breed</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.imageUrl}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
