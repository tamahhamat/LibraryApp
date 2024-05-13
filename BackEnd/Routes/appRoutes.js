const express = require('express');
const router = express.Router();
const path = require('path');

// Import queries
const { searchBooks } = require('../Models/queries');

// Route to serve home.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'home.html'));
});


// Search route
router.get('/search', async (req, res) => {
    try {
      const searchTerm = req.query.query; //search term from request
      const books = await searchBooks(searchTerm); //use query
  
      if (books.length === 0) {
        res.send('No books found');
      } else {
        res.json(books);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).send('Internal Server Error');
    }
  });




module.exports = router;