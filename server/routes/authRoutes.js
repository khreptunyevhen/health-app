import express from "express";
import { __dirname } from "../app.js";
import insertTheUser from "../models/insertTheUser.js";
import getHashedPassword from "../utils/getHashedPassword.js";

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

export default router;
