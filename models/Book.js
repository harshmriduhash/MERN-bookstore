const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookId: {
    type: String,
    unique: true
  },
  title: String,
  authors: Array,
  description: String,
  image: String,
  link: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;