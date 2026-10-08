import { createContext, useEffect, useReducer } from 'react';
import { calculateSubtotal } from '../utils/calculateTotal';

export const CartContext = createContext(null);

function reducer(items, action) {
  switch (action.type) {
    case 'ADD': {
      const found = items.find((i) => i.id === action.item.id);
      return found
        ? items.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { ...action.item, qty: 1 }];
    }
    case 'REMOVE': return items.filter((i) => i.id !== action.id);
    case 'INCREASE': return items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case 'DECREASE': return items.map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0);
    case 'CLEAR': return [];
    default: return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], () => JSON.parse(sessionStorage.getItem('cart') || '[]'));

  useEffect(() => sessionStorage.setItem('cart', JSON.stringify(items)), [items]);

  const value = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: calculateSubtotal(items),
    addItem: (item) => dispatch({ type: 'ADD', item }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    increase: (id) => dispatch({ type: 'INCREASE', id }),
    decrease: (id) => dispatch({ type: 'DECREASE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
