import db from "../db.js";

export const authChecked = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.token;

    if (!sessionToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Perform a database query to check if the session token exists and is valid
    const sessionInfo = await db.query(
      "SELECT * FROM sessions WHERE token=$1",
      [sessionToken]
    );
    const session = sessionInfo.rows[0];

    if (!session || session.expires_at < new Date()) {
      // If the session is not found or has expired, return an error response
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user_id = session.user_id;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking authentication" });
  }
};
