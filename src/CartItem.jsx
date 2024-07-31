import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    // Logic to return to the plant listing page
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div>{item.name}</div>
          <div>{item.cost}</div>
          <div>
            <button onClick={() => handleDecrement(item)}>-</button>
            {item.quantity}
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <div>Total: ${calculateTotalCost(item)}</div>
          <button onClick={() => handleRemove(item)}>Delete</button>
        </div>
      ))}
      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default CartItem;
