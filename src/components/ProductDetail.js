import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const averageStars = product.reviews.reduce((acc, review) => acc + review.stars, 0) / product.reviews.length;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Stars: {averageStars.toFixed(1)}</p>
      <button
         className={`add-to-cart ${!product.price ? 'disabled' : ''}`}
        onClick={() => addToCart(product)}
        disabled={!product.price} // Disable button if no price is available
      >
        {product.price ? `Add to Cart - $${product.price}` : 'Out of Stock'}
      </button>
      <style jsx>{`
        .product-detail {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
        }
        button.add-to-cart.disabled {
          background-color: grey;
          cursor: not-allowed;
          color: white;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
