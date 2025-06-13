const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/BookController');

router.get('/', auth, getBooks);             // GET all books
router.get('/:id', auth, getBook);           // GET a single book by ID
router.post('/', auth, createBook);          // POST to create a new book
router.patch('/:id', auth, updateBook);      // PATCH to update a book by ID
router.delete('/:id', auth, deleteBook);     // DELETE to remove a book by ID

module.exports = router;
