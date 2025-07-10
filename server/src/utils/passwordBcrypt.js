import bcrypt from "bcrypt";

const saltRounds = 10;

// for encrypting password
export const passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

// for decrypting password
export const passwordCompare = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

//   data.password = hashPassword(data.password);
