import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;

  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Stars: {averageStars.toFixed(1)}</p>
      <Link to={`/products/${product.id}`}>
        <button>More Info</button>
      </Link>
      <style jsx>{`
        .product-item {
          border: 1px solid #ddd;
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
        }
        button {
          margin-top: 10px;
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
