require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routers/AuthRoutes');
const bookRouters = require('./routers/BookRouters');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// ✅ Add this basic root route
app.get('/', (req, res) => {
  res.send('📚 Simple Book API is running!');
});

// Route middleware
app.use('/api/auth', authRoutes); 
app.use('/api/books', bookRouters);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
