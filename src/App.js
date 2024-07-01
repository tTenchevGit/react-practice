import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart'; // Import the new Cart component

const App = () => {
  // State to manage the filter for product list
  const [filter, setFilter] = useState(null);

  // State to manage the visibility of the cart
  const [cartVisible, setCartVisible] = useState(false);

  // State to manage the items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding items to the cart
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
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
  };

  // Function to handle removing items from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
  };

  // Function to update the quantity of items in the cart
  const updateCartItemQuantity = (id, quantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to local storage
  };

  // Function to toggle the cart visibility
  const handleCartButtonClick = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="App">
      <NavBar setFilter={setFilter} handleCartButtonClick={handleCartButtonClick} />
      <Routes>
        <Route path="/" element={<ProductList filter={filter} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
      <Footer />
      <Cart
        isVisible={cartVisible}
        onClose={() => setCartVisible(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity} // Pass updateCartItemQuantity to Cart component
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
