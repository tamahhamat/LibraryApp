require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 800; 


app.use(cors({
  origin: 'http://127.0.0.1:5501', // allow requests from this origin
  methods: ['GET', 'POST'], // allow GET and POST 
  credentials: true, 
}));

// body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     styleSrc: ["'self'", 'https://fonts.googleapis.com'],
//     fontSrc: ["'self'", 'https://fonts.gstatic.com'],
//     imgSrc: ["'self'", 'data:', 'https://your-image-source.com'],
//     scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'], // Add any other script sources
//     connectSrc: ["'self'", 'https://fonts.googleapis.com'], // For fetching fonts and other external resources
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: []
//   },
// }));


// Serve static files from the FrontEnd directory
app.use(express.static(path.join(__dirname, '../Fronten/views')));



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