require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


// Serve static files from the FrontEnd directory
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Set MIME type for JavaScript files in the Public directory
app.use('/Public', (req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    next();
});

// Set up views directory
app.set('views', path.join(__dirname, 'FrontEnd', 'views'));
app.set('view engine', 'html');


// body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Import routes
const appRoutes = require('./Routes/appRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');


// Mount routes
app.use(appRoutes);
app.use('/library', appRoutes);
app.use(userRoutes);
app.use(authRoutes);



const port = process.env.PORT || 800; 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});