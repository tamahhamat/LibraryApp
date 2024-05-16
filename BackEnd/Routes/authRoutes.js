const express = require('express');
const router = express.Router();
const path = require('path');
const { addBook, deleteBook, updateBook } = require('../Models/queries');



// Serve the add book form
router.get('/addBook', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'addBook.html'));
});

// Serve the delete book form
router.get('/deleteBook', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'deleteBook.html'));
});

// Serve the edit book form
router.get('/editBook', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'editBook.html'));
});



module.exports = router;