import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Adds a new plant item to the cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (!existingItem) {
        state.items.push({...action.payload, quantity: 1});
      } else {
        existingItem.quantity += 1;
      }
    },
    // Removes an item from the cart based on its name
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    // Updates the quantity of an existing item in the cart
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
