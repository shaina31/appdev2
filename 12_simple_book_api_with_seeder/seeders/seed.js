require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Book = require('../models/Books');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('🧹 Cleared users and books collections.');

    const users = [];

    // ✅ Add a known test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    });
    users.push(await testUser.save());
    console.log('🔑 Test user seeded: test@example.com / password123');

    // Add 5 random users
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(await user.save());
    }
    console.log('👤 5 random users seeded.');

    // Seed 10 books linked to random users
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 30 }).getFullYear(),
        user: randomUser._id,
      });
      await book.save();
    }
    console.log('📚 10 books seeded.');

    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
