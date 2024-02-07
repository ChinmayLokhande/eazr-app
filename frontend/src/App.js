import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';
import AddToCart from './components/AddToCart';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/add-to-cart" element={<AddToCart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
