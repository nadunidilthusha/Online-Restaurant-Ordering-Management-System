export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Safely handle Zod errors whether they use .errors or .issues
    const issues = error.errors || error.issues;
    const message = issues && issues.length > 0 ? issues[0].message : 'Validation failed';
    return res.status(400).json({ error: message });
  }
};