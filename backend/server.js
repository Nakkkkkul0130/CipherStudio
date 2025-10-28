const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cipherstudio')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err.message));

app.use('/api/projects', require('./routes/projects'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({ message: 'CipherStudio API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});