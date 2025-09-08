import type { Product } from '@/hooks/useProduct';

type ShoppingCartState = {
  items: { product: Product; quantity: number }[];
  total: number;
};

type ActionType = {
  type: string;
  payload: Product | number;
};

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
};

function shoppingCartReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload as Product;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      return { ...state, total: state.total + 1 };
    }
    case 'REMOVE_FROM_CART': {
      const productId = action.payload as number;
      const itemToRemove = state.items.find(
        (item) => item.product.id === productId
      );
      if (itemToRemove) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId
        );
        return { ...state, total: state.total - itemToRemove.quantity };
      }
      return state;
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

export default shoppingCartReducer;