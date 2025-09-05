import type { Product } from '@/hooks/useProduct';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ShoppingCartState = {
  items: { product: Product; quantity: number }[];
  total: number;
};

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.total += 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total -= 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
