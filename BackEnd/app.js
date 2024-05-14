require('dotenv').config();

const express = require('express');
const path = require('path');
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


// Import routes
const appRoutes = require('./Routes/appRoutes');


// Mount routes
app.use(appRoutes);
app.use('/library', appRoutes);



const port = process.env.PORT || 800; 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});