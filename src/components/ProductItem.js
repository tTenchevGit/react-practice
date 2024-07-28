// src/components/ProductItem.js
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { auth, db } from '../firebaseConfig';

const ProductItem = ({ product, addToCart }) => {
  const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;
  const { isDarkMode } = useContext(ThemeContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  useEffect(() => {
    const checkWishlist = async (user) => {
      if (user) {
        try {
          const userId = user.uid;
          console.log(`Checking wishlist for user: ${userId}`); // Debug log
          const wishlistRef = db.ref(`wishlists/${userId}`);
          wishlistRef.on('value', snapshot => {
            const wishlist = snapshot.val();
            console.log(`Fetched wishlist for user ${userId}:`, wishlist); // Debug log
            if (wishlist && wishlist.includes(product.id)) {
              setIsWishlisted(true);
            } else {
              setIsWishlisted(false);
            }
          });
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      } else {
        console.log('No authenticated user found'); // Debug log
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        checkWishlist(user);
      } else {
        setIsAuthenticated(false);
        setIsWishlisted(false);
      }
    });

    return () => unsubscribe();
  }, [product.id]);

  const handleWishlist = async () => {
    if (auth.currentUser) {
      try {
        const userId = auth.currentUser.uid;
        const wishlistRef = db.ref(`wishlists/${userId}`);
        wishlistRef.once('value', snapshot => {
          const wishlist = snapshot.val() || [];
          if (isWishlisted) {
            // Remove from wishlist
            const updatedWishlist = wishlist.filter(id => id !== product.id);
            wishlistRef.set(updatedWishlist);
            console.log(`Removed ${product.id} from wishlist for user ${userId}`);
          } else {
            // Add to wishlist
            const updatedWishlist = [...wishlist, product.id];
            wishlistRef.set(updatedWishlist);
            console.log(`Added ${product.id} to wishlist for user ${userId}`);
          }
          setIsWishlisted(!isWishlisted);
        });
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    } else {
      alert("Please log in to add to wishlist.");
    }
  };

  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      {isAuthenticated && (
          <button onClick={handleWishlist}>
            {isWishlisted ? "⭐" : "☆"}
          </button>
        )}
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Stars: {averageStars.toFixed(1)}</p>
      <p>{product.price ? `Price: $${product.price}` : 'Out of Stock'}</p>
      <div>
        <Link to={`/products/${product.id}`}>
          <button>More Info</button>
        </Link>
        <button
          className={`add-to-cart ${!product.price ? 'disabled' : ''}`}
          onClick={() => addToCart(product)}
          disabled={!product.price}
        >
          {product.price ? `Add to Cart - $${product.price}` : 'Out of Stock'}
        </button>
      
      </div>
      <style jsx>{`
        .product-item {
          color: ${isDarkMode ? 'black' : 'black'} !important;
          border: 1px solid #ddd;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          background-color: #fff;
          max-width: 300px;
          flex: 1 1 calc(33% - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
        }
        button.add-to-cart.disabled {
          background-color: grey;
          cursor: not-allowed;
          color: white;
        }
        button {
          margin: 10px;
          padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 768px) {
          .product-item {
            flex: 1 1 calc(50% - 40px);
          }
        }
        @media (max-width: 480px) {
          .product-item {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductItem;
