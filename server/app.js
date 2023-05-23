import express from "express";
import colors from "colors";
import * as url from "url";
import dotenv from "dotenv";
import db from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import { authChecked } from "./middleware/authChecked.js";

dotenv.config();

export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.static("public"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using the routers
app.use("/", authRoutes);

app.get("/user/dashboard", authChecked, (req, res) => {
  res.sendFile("dashboard.html", { root: __dirname + "/views" });
});

app.get("/user/login", (req, res) => {
  res.cookie("foo", "bar");
  res.send("cookie");
});

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => {
    app.listen(PORT, (err) => {
      err
        ? console.error(err)
        : console.log(
            `My app listening on port ${process.env.HOST}:${PORT}...`.bold.blue
          );
    });
    console.log("Connected to the database...".bold.green);
  })
  .catch((err) => {
    console.error("Error executing query", err.stack);
    process.exit(1);
  });
