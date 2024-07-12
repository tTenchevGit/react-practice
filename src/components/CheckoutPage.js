import React, { useState } from 'react';

const CheckoutPage = ({ cartItems, removeFromCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to handle the form submission
    // For example, you can send the form data and cart items to a server
    console.log('Form Data:', formData);
    console.log('Cart Items:', cartItems);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .checkout-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        div {
          margin-bottom: 10px;
        }

        label {
          font-weight: bold;
        }

        input {
          padding: 5px;
          width: 100%; 
          box-sizing: border-box;
        }

        button[type='submit'] {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .cart-summary {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 5px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .cart-item img {
          max-width: 100px;
          margin-right: 10px;
        }

        .cart-item button {
          padding: 5px 10px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;