import { requireAdmin } from '../middleware/auth.js';

let warned = false;

// If requireAdmin is still the empty placeholder, nothing sets req.admin.
// Requests still work (so you can build and test), but we warn loudly once.
const warnIfOpen = (req, res, next) => {
  if (!req.admin && !warned) {
    warned = true;
    console.warn(
      '\n[WARNING] requireAdmin in src/middleware/auth.js is not implemented yet.\n' +
      '          Admin routes (dashboard, saving Home/About) are OPEN to everyone.\n' +
      '          Do not deploy until the auth part is finished.\n'
    );
  }
  next();
};

// use as:  router.put('/x', adminOnly, handler)   or   router.use(adminOnly)
export const adminOnly = [requireAdmin, warnIfOpen];
