require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();
app.use(express.json());

if (process.env.MONGO_URI) {
	connectDB().catch(err => {
		console.error('DB connection failed; continuing without DB:', err.message || err);
	});
} else {
	console.warn('Warning: MONGO_URI not set. Starting server without DB connection.');
}

app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
