const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signupSchema, signinSchema } = require('../validators/auth');

const JWT_SECRET = process.env.JWT_SECRET;

const AuthController = {
  signup: async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) return res.status(409).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  signin: async (req, res) => {
    const { error } = signinSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { usernameOrEmail, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (!user) return res.status(401).json({ error: 'User not found' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Signin successful', token });
    } catch (err) {
      console.error('Signin error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = AuthController;
