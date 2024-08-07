
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { fetchWishlist } from '../utils/wishlistUtils';
import ProductList from './ProductList';

const WishlistButton = ({ addToCart }) => {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchWishlistIds = async (user) => {
      if (user) {
        const userId = user.uid;
        const ids = await fetchWishlist(userId);
        setWishlistIds(ids);
      }
    }; 

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchWishlistIds(user);
      } else {
        setWishlistIds([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <ProductList wishlistIds={wishlistIds} addToCart={addToCart} />
      <style jsx>{`
        .wishlist-container {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default WishlistButton;
