const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { whitelist } = require('../whitelist');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    console.log('Full request body:', JSON.stringify(req.body));
    const { username, email, password } = req.body;
    console.log('Destructured values:', { username, email, password: password ? 'provided' : 'not provided' });
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = new User({ username, email, password });
    console.log('User object before save:', user.toObject({ getters: true, virtuals: false }));
    
    await user.save();
    
    console.log('User created successfully:', username);
    console.log('Saved user:', user.toObject({ getters: true, virtuals: false }));
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('Signup error:', error);
    res.status(500).json({ error: 'An unexpected error occurred during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate the token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token in the response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

module.exports = { signup: exports.signup, login: exports.login };