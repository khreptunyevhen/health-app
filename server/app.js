import express from "express";
import colors from "colors";
import * as url from "url";
import dotenv from "dotenv";
import db from "./db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Using the routers
app.use("/", authRoutes);

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
