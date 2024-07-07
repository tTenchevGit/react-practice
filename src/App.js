// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AddReview from './components/AddReview';
import SearchBar from './components/SearchBar'; 
import CheckoutPage from './components/CheckoutPage';



const App = () => {
  const [filter, setFilter] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for managing search query

 
  
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartVisible(true);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateCartItemQuantity = (id, quantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleCartButtonClick = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="App">
      <NavBar setFilter={setFilter} handleCartButtonClick={handleCartButtonClick} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Add the SearchBar */}
      <Routes>
        <Route path="/" element={<ProductList filter={filter} addToCart={addToCart} searchQuery={searchQuery} />} /> {/* Pass searchQuery to ProductList */}
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/products/:id/add-review" element={<AddReview />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
      <Cart
        isVisible={cartVisible}
        onClose={() => setCartVisible(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
      />
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
