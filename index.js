const express = require("express");
const app = express();
const port = "3000";
const mongoose = require("mongoose");

const characters = require("./routes/characters");

// Connect to DB
mongoose
  .connect("mongodb://localhost/rosharapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to DB!");
    },
    // Error
    (err) => {
      console.log("An error occured: ", err);
    }
  );

// Middlewares;
app.use(express.json());

// Route Middlewares
app.use("/api/character", characters);

// Serve API
app.listen(port, () => {
  console.log(`Roshar API listening at http://localhost:${port}`);
});
