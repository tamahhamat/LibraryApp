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
  methods: ['GET', 'POST', 'DELETE', 'PATCH'], // allow GET and POST 
  credentials: true, 
}));

// body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Serve static files from the FrontEnd directory
app.use(express.static(path.join(__dirname, '..', 'FrontEnd')));

// Serve librarianStyle.css from the styles directory
app.use('/styles', express.static(path.join(__dirname, '..', 'FrontEnd', 'styles')));


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