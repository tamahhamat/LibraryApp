require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./Middleware/authMiddleware'); // Corrected path

const app = express();
const port = process.env.PORT || 800; 

app.use(cors({
  origin: process.env.NODE_ENV === 'staging' ? 'http://staging.example.com' : 'http://127.0.0.1:5501',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}));

// body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the FrontEnd directory
app.use(express.static(path.join(__dirname, '..', 'FrontEnd')));

// Serve styles
app.use('/styles', express.static(path.join(__dirname, '..', 'FrontEnd', 'styles')));

// Import routes
const appRoutes = require('./Routes/appRoutes'); // Corrected path
const authRoutes = require('./Routes/authRoutes'); // Corrected path

// Mount routes
app.use(appRoutes);

// Apply authenticateToken middleware to authRoutes
app.use('/api', authenticateToken);
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
