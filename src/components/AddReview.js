import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      user,
      comment,
      stars: parseInt(stars),
    };

    fetch(`http://localhost:4000/products/${id}`)
      .then(response => response.json())
      .then(product => {
        const updatedProduct = {
          ...product,
          reviews: [...product.reviews, newReview],
        };

        fetch(`http://localhost:4000/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        })
          .then(() => navigate(`/products/${id}`))
          .catch(error => console.error('Error:', error));
      });
  };

  return (
    <div className="add-review">
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <div>
          <label>Stars:</label>
          <input type="number" value={stars} onChange={(e) => setStars(e.target.value)} min="0" max="5" required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <style jsx>{`
        .add-review {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        div {
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input, textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        button {
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

export default AddReview;
