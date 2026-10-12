import { createContext, useEffect, useReducer } from 'react';
import { calculateSubtotal } from '../utils/calculateTotal';

export const CartContext = createContext(null);

export const DEFAULT_CART_ITEMS = [
  {
    id: 1,
    name: 'Fire-roasted Sea Bass',
    tag: 'CHEF PICK',
    tagType: 'pick',
    desc: 'Charred lemon, shaved fennel & sofrito',
    note: 'Note: Extra saffron butter infusion',
    price: 24.0,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Burrata & Fig Salad',
    tag: 'VEGETARIAN',
    tagType: 'veg',
    desc: 'Warm mission figs, honey pistachio crumble',
    note: 'Note: Honey & pistachio dressing on side',
    price: 14.0, // 2 * 14 = 28
    qty: 2,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Wood-fired Margherita',
    tag: 'POPULAR',
    tagType: 'popular',
    desc: 'San Marzano tomato, buffalo mozzarella',
    note: '',
    price: 16.0,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Salted Caramel Tart',
    tag: 'SWEET',
    tagType: 'sweet',
    desc: 'Dark chocolate, sea salt flakes, cider',
    note: '',
    price: 10.0, // 2 * 10 = 20
    qty: 2,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
  },
];

function reducer(items, action) {
  switch (action.type) {
    case 'ADD': {
      const found = items.find((i) => i.id === action.item.id);
      return found
        ? items.map((i) => (i.id === found.id ? { ...i, qty: i.qty + (action.item.qty || 1) } : i))
        : [...items, { ...action.item, qty: action.item.qty || 1 }];
    }
    case 'REMOVE':
      return items.filter((i) => i.id !== action.id);
    case 'INCREASE':
      return items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case 'DECREASE':
      return items
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case 'CLEAR':
      return [];
    case 'RESET_DEFAULT':
      return [...DEFAULT_CART_ITEMS];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], () => {
    const saved = sessionStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // ignore parse error
      }
    }
    return DEFAULT_CART_ITEMS;
  });

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const value = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: calculateSubtotal(items),
    addItem: (item) => dispatch({ type: 'ADD', item }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    increase: (id) => dispatch({ type: 'INCREASE', id }),
    decrease: (id) => dispatch({ type: 'DECREASE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    resetToDefault: () => dispatch({ type: 'RESET_DEFAULT' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

