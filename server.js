require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const pool = require('./config/db');
const User = require('./src/models/User');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes and origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable JSON body parsing and cookie parsing
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// Middleware to authenticate the user using JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Adjust for different token formats
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// Proxy endpoint
app.get('/api/matches', async (req, res) => {
  const { date } = req.query;
  try {
    const response = await axios.get(`${API_URL}/matches${date ? `?date=${date}` : ""}`, {
      headers: {
        'X-Auth-Token': API_TOKEN
      }
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    const exists = await User.exists(email, username);
    if (exists) {
      return res.status(409).json({
        message: 'User already exists. Please login.',
        loginUrl: '/login'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, email, hashedPassword, firstName, lastName);
    res.status(201).json({
      message: 'Account created successfully! Please log in.',
      loginUrl: '/login',
      user
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt for username:', username);  // Log username for debugging
    const user = await User.findByUsername(username);
    if (!user) {
      console.log('User not found:', username);  // Log user not found
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Incorrect password for user:', username);  // Log incorrect password
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true }); // secure: true only if using HTTPS
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Endpoint to get user details
app.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = 'SELECT username, email FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catchall handler for any request that doesn't match the above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
