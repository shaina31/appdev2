const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [
  { id: 1, 
    title: "The Summer I Turned Pretty", 
    author: "Jenny Han" 
},
  { id: 2, 
    title: "The Mechanic's Tale", 
    author: "Steve Matchett" 
},
  { id: 3, 
    title: "Crazy Rich Asians", 
    author: "Kevin Kwan" 
},
  { id: 4, 
    title: "Paper Towns", 
    author: "John Green" 
},
  { id: 5, 
    title: "A Walk To Remember", 
    author: "Nicholas Sparks" 
}
];

require('crypto').randomBytes(64).toString('hex')

app.get('/', (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});


app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(200).json(newBook);
});

app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  
  books = books.map((book, i) => ({
  ...book,
  id: i + 1
}));

res.json({ message: `Book with ID ${id} deleted successfully` });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
