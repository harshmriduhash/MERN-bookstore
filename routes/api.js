const router = require("express").Router();
const Book = require("../models/Book.js");

router.get("/api/books", function(req, res) {
  Book.find().then((data) => {
    console.log(data);
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.post("/api/books", function(req, res) {
  Book.create(req.body).then(() => {
    res.status(200).end();
  }).catch((err) => {
    res.json(err);
  });
});

router.delete("/api/books/:id", function(req, res) {
  Book.deleteOne({_id: req.params.id}).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;