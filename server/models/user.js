import db from "../db.js";

const insertTheUser = (username, email, hashedPassword) => {
  db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, hashedPassword]
  );
};

export default insertTheUser;
