import jwt from "jsonwebtoken";

export const generateJWT = async (user) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1000s",
  });
  return accessToken;
};
