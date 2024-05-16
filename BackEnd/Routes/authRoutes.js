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

// Add a book
router.post('/addBook', async (req, res) => {
    const { ISBN, title, author, genre } = req.body;
    try {
        await addBook({ ISBN, title, author, genre });
        res.status(200).send('Book added successfully');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;