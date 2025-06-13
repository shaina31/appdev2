const Book = require('../models/Books');
const sendBookEmail = require('../middlewares/send-email.middleware');

// Get all books
const getBooks = (req, res) => {
  Book.find({})
    .then((books) => {
      res.json({ success: true, books });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

// Get a single book by ID
const getBook = (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.json({ success: true, book });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

// Create a new book and send email
const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    // Send email notification
    await sendBookEmail(newBook);

    res.status(201).json({
      success: true,
      message: 'Book is successfully added and email sent!',
      book: newBook,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a book by ID
const updateBook = (req, res) => {
  const { id } = req.params;
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.json({ success: true, book: updatedBook });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

// Delete a book by ID
const deleteBook = (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.json({ success: true, message: 'Book is successfully deleted!' });
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
  deleteBook,
};
