import express from "express";
import { __dirname } from "../app.js";
import insertTheUser from "../models/user.js";
import {
  getHashedPassword,
  comparePassword,
} from "../utils/getHashedPassword.js";
import db from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Route for the main page
router.get("/", (req, res) => {
  res.sendFile("main.html", { root: __dirname + "/views" });
});

router.get("/user/register", (req, res) => {
  res.sendFile("register.html", { root: __dirname + "/views" });
});

router.get("/user/login", (req, res) => {
  res.sendFile("login.html", { root: __dirname + "/views" });
});

router.post("/user/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || password.length < 8) {
      res.status(400).json({ message: "Invalid password." });
      return;
    }

    const hashedPassword = await getHashedPassword(password);

    insertTheUser(username, email, hashedPassword);

    // Send a response indicating successful registration
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error with the registration." });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  // Fetch the user with the provided email
  const userInfo = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = userInfo.rows[0];

  const isCorrectPassword = await comparePassword(password, user.password);
  // If no such user exists, or the password is incorrect, send an error
  if (!user || !isCorrectPassword) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }
  // If the credentials are correct, create a new session

  // Set a cookie with the token

  // Send a response indicating successful login

  res.json({ message: "hello" });
});

export default router;
