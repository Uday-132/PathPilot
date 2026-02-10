const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now to fix the issue
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// MongoDB Connection Function
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pathfinder');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/roadmap', require('./routes/roadmap'));

// Root Route for Vercel Check
app.get('/', (req, res) => {
    res.send('PathPilot API is running...');
});

const PORT = process.env.PORT || 5001;

// Only listen if not running on Vercel (exported)
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} with updated routes!`));
}

module.exports = app;
