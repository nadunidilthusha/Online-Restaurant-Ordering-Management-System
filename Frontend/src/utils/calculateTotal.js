export const calculateSubtotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0);

export const calculateTotal = (items, deliveryFee = 0) => calculateSubtotal(items) + deliveryFee;
