const express = require('express');
const router = express.Router();

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/BookController');

// GET all books
router.get('/', getBooks);

// GET a single book by ID
router.get('/:id', getBook);

// POST to create a new book
router.post('/', createBook);

// PATCH to update a book by ID
router.patch('/:id', updateBook);

// DELETE to remove a book by ID
router.delete('/:id', deleteBook);

module.exports = router;
