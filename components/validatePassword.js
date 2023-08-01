import bcrypt from "bcrypt";

export const validatePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("something went wrong in comparing passwords");
  }
};
