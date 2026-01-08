const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set in environment');
    throw new Error('MONGO_URI is not set');
  }

  try {
    await mongoose.connect(uri, {
      // use the new URL parser and topology by default in modern mongoose
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = connectDB;
