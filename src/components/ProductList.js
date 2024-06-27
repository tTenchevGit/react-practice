import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ filter }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(data => {
        if (filter) {
          setProducts(data.filter(product => {
            const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;
            return Math.floor(averageStars) === filter;
          }));
        } else {
          setProducts(data);
        }
      });
  }, [filter]);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
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
