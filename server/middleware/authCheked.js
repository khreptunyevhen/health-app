import db from "../db.js";

export const authChecked = async (req, res, next) => {
  const sessionToken = req.cookies.token;

  console.log(sessionToken);
  next();
};
