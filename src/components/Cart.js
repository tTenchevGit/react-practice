import React from 'react';

const Cart = ({ isVisible, onClose, cartItems, updateCartItemQuantity, removeFromCart }) => { // Use props to manage cart items

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // If the cart is not visible, return null to not render the cart
  if (!isVisible) return null;

  return (
    <div className="cart">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p> {/* Show the total price for each item */}
              <input
                type="number"
                value={item.quantity}
                onChange={e => updateCartItemQuantity(item.id, parseInt(e.target.value))} // Use the prop to update quantity
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button> {/* Add remove button */}
            </div>
          </div>
        ))
      )}
      <style jsx>{`
        .cart {
          position: fixed;
          right: 0;
          top: 0;
          width: 300px;
          height: 100%;
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
