require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 800; 


app.use(cors({
  origin: 'http://127.0.0.1:5501', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  credentials: true, // Allow cookies and authorization headers
}));

// body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static files from the FrontEnd directory
//app.use(express.static(path.join(__dirname, 'FrontEnd')));
app.use(express.static(path.join(__dirname, '../Frontend')));



// // Set MIME type for JavaScript files in the Public directory
// app.use('/Public', (req, res, next) => {
//     if (req.url.endsWith('.js')) {
//       res.setHeader('Content-Type', 'text/javascript');
//     }
//     next();
// });


// Set MIME type for JavaScript files in the Public directory
app.use('/public', express.static(path.join(__dirname, '../Frontend/Public')));


// // Set up views directory
// app.set('views', path.join(__dirname, 'FrontEnd', 'views', 'public'));
// app.set('view engine', 'html');


// Import routes
const appRoutes = require('./Routes/appRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');


// Mount routes
app.use(appRoutes);
app.use('/library', appRoutes);
app.use(userRoutes);
app.use(authRoutes);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});