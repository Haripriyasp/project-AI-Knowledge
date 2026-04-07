const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env' });

/* ✅ ADD HERE */
console.log("ENV CHECK:");
console.log("GROQ:", process.env.GROQ_API_KEY);
console.log("MONGO:", process.env.MONGODB_URI);
console.log("JWT:", process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log('DB Error:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));