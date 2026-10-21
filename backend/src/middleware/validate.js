export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Send back the first validation error message to the frontend
    return res.status(400).json({ error: error.errors[0].message });
  }
};