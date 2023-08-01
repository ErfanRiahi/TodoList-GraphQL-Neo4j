import jwt from "jsonwebtoken";

export const validateUser = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
