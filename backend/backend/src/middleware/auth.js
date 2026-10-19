// TODO (auth owner):
// - requireAdmin: read "Authorization: Bearer <token>", verify the JWT with JWT_SECRET,
//   attach the admin to req.admin, otherwise respond 401.
// - optionalAdmin: same, but continue without error when there is no token
//   (used by public GET routes that show extra data to admins).
export const requireAdmin = (req, res, next) => next();
export const optionalAdmin = (req, res, next) => next();
