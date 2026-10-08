require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res) => res.send("Welcome to our Inventory App"));

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Inventory Management App - follow http://localhost:${PORT}`);
});
