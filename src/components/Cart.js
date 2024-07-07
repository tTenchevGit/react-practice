import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isVisible, onClose, cartItems, updateCartItemQuantity, removeFromCart }) => {
  const cartRef = useRef(null);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleTouchOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleTouchOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [onClose]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isVisible) return null;

  return (
    <div className="cart" ref={cartRef}>
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className='checkout-wrapper'>
          <button className="checkout-button" onClick={handleCheckoutClick} >Checkout</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .checkout-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .checkout-button{
          margin: 40px auto;
           
            padding: 10px 20px;
            background-color: #0070f3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.2s ease-in-out;
        }
        
        .cart {
          position: fixed;
          right: 0;
          top: 77px;
          width: 300px;
          height: 90%;
          background-color: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
          padding: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: black;
        }

        .cart-items-container {
          overflow-y: auto;
          max-height: calc(100vh - 200px);
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        .cart-items-container::-webkit-scrollbar {
          width: 8px;
        }

        .cart-items-container::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        .cart-items-container::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 4px;
        }

        .cart-items-container::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }

        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .cart-item img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        .cart-item button {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Cart;