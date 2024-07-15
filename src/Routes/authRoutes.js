const express = require('express');
const router = express.Router();
const path = require('path');
const { searchBooks, getBookByISBN, addBook, removeBook, updateBook } = require('../Models/queries');




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


// PATCH route to update a book
router.patch('/updateBook', async (req, res) => {
    const { ISBN, newTitle, newAuthor, newGenre } = req.body;

    try {
        const currentBook = await getBookByISBN(ISBN);
        if (!currentBook) {
            return res.status(404).send('Book not found');
        }

        const updatedFields = {};
        if (newTitle) updatedFields.title = newTitle;
        if (newAuthor) updatedFields.author = newAuthor;
        if (newGenre) updatedFields.genre = newGenre;

        await updateBook(ISBN, updatedFields);
        res.status(200).send('Book updated successfully');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route to handle deleting a book
router.delete('/removeBook', async (req, res) => {
    const { ISBN } = req.body;
    try {
        await removeBook(ISBN);
        res.status(200).send('Book removed successfully');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;