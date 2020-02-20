const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/Book.js");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/books", function(req, res) {
  Book.find({}).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

app.post("/api/books", function(req, res) {
  Book.create(req.body).then(() => {
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

app.delete("/api/books/:id", function(req, res) {
  Book.deleteOne({_id: req.params.id}).then(() => {
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
