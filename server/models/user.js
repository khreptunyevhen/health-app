import db from "../db.js";

export const insertTheUser = (username, email, hashedPassword) => {
  db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, hashedPassword]
  );
};

export const insertTheSession = (token, userId, expiresAt) => {
  db.query(
    "INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt]
  );
};
