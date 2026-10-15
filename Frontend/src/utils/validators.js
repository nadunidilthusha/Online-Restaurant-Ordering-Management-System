export const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v);

// keep digits only, optionally limited in length
export const digitsOnly = (v, max = 99) => String(v).replace(/\D/g, '').slice(0, max);

// phone: digits only, one optional leading "+" for international numbers, max 15 digits
export const cleanPhone = (v) => {
  const s = String(v);
  const plus = s.trim().startsWith('+') ? '+' : '';
  return plus + s.replace(/\D/g, '').slice(0, 15);
};

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!isEmail(email)) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}