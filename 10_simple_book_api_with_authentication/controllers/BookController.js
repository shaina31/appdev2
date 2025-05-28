const Book = require("../models/Books");

const getBooks = (req, res) => {
  Book.find({})
    .then((books) => {
      res.json({ books: books, success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

const getBook = (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
      }
      res.json({ book: book, success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

const createBook = (req, res) => {
  Book.create(req.body)
    .then(() => {
      res.json({ success: true, message: "Book is successfully added!" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { new: true }) 
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ success: false, message: "Book not found" });
      }
      res.json({ book: updatedBook, success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((book) => {
      if (!book) return res.json({ success: false, message: "Book not found!" });
      res.json({ success: true, message: "Book is successfully deleted!" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
