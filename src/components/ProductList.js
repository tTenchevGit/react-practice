// ProductList.js
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ filter, addToCart, searchQuery }) => { // Added searchQuery as a prop
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(data => {
        let filteredProducts = data;
        if (filter) {
          filteredProducts = data.filter(product => {
            const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;
            return Math.floor(averageStars) === filter;
          });
        }
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter products based on search query
          );
        }
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching products:', error)); // Catch and log errors
  }, [filter, searchQuery]); // Added searchQuery as a dependency

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
