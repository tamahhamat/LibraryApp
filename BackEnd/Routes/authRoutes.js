const express = require('express');
const router = express.Router();
const path = require('path');
const { addBook, removeBook, updateBook } = require('../Models/queries');



// Serve the add book form
router.get('/addBook', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'addBook.html'));
});

// Serve the remove book form
router.get('/removeBook', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'removeBook.html'));
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

// remove a book
router.post('/removeBook', async (req, res) => {
    const { ISBN } = req.body;
    try {
        await removeBook(ISBN);
        res.status(200).send('Book removed successfully');
    } catch (error) {
        console.error('Error removing book:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;