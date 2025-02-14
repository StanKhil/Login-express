const express = require('express');
const cors = require('cors');
const connectDB = require('./dbconfigs');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
});

app.post('/users', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send('Name and password are required');
  }

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ name, password });
    await newUser.save();
    res.status(201).send('User added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding user');
  }
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send('Name and password are required');
  }

  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    res.status(200).send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
