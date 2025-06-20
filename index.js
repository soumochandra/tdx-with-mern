


const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');
const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/mutualfunds');

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.send({ message: 'Registered' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'secret');
    res.send({ token });
  } else res.status(401).send({ error: 'Invalid' });
});

app.get('/saved', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send(user.savedFunds || []);
});

app.post('/save', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.savedFunds.push(req.body.fund);
  await user.save();
  res.send({ message: 'Saved' });
});

app.post('/remove', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.savedFunds = user.savedFunds.filter(f => f.id !== req.body.fund.id);
  await user.save();
  res.send({ message: 'Removed' });
});

app.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});


app.listen(5000, () => console.log('Backend running on 5000'));
