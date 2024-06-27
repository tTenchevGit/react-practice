import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [filter, setFilter] = useState(null);

  return (
    <div className="App">
      <NavBar setFilter={setFilter} />
      <Routes>
        <Route path="/" element={<ProductList filter={filter} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .App {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        nav {
          margin-bottom: 20px;
        }
        footer {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

export default App;
