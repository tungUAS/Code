const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader)
    throw new Error("Authentication header must be 'Bearer [token]");

  const token = authHeader.split("Bearer ")[1];
  if (!token) throw new Error("Authentication token must be 'Bearer [token]");
  try {
    const user = jwt.verify(token, config.SECRET_KEY);
    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid/Expired token");
  }
};
