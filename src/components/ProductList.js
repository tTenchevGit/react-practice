
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ filter, addToCart, searchQuery, wishlistIds }) => { 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        let filteredProducts = data;

        if (wishlistIds) {
          filteredProducts = data.filter(product => wishlistIds.includes(product.id));
        } else {
          if (filter) {
            filteredProducts = data.filter(product => {
              const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;
              return Math.floor(averageStars) === filter;
            });
          }
          if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAndSetProducts();
  }, [filter, searchQuery, wishlistIds]); // Added wishlistIds as a dependency

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
      <style jsx>{`
        .product-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
