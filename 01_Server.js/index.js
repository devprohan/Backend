const express = require("express");
const env = require("dotenv");

env.config();
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello From Home !"); // In string Form
});

app.get("/twitter", (req, res) => {
  res.send("Rohan@x.com");
});

app.get("/login", (req, res) => {
  res.send(`<h1>Please Login At Chai Aur Code </h1>`); // In HTML Form
});

app.get("/youtube", (req, res) => {
  res.send(`<h2>Chai Aur Code</h2>`);
});

app.get("/github", (req, res) => {
  res.json({
    Name: "Rohan",
    Age: "20",
    Add: "Nagpur",
  }); //In json form
});

app.listen(port, () => console.log(`Server Is Listning At:${port}`));
