import bcrypt from "bcrypt";

export const getHashedPassword = async (password) => {
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (userPassword, hashPassword) => {
  return await bcrypt.compare(userPassword, hashPassword);
};
