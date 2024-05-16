const pool = require('../database');
const User = require('./userModel');



//search books
async function searchBooks(query) {
  const searchQuery = `
    SELECT * 
    FROM books 
    WHERE title ILIKE $1 OR author ILIKE $1
  `;
  const { rows } = await pool.query(searchQuery, [`%${query}%`]);
  return rows;
}


const addBook = async (book) => {
  const { ISBN, title, author, genre } = book;
  const query = 'INSERT INTO books (ISBN, title, author, genre) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [ISBN, title, author, genre]);
};

const removeBook = async (ISBN) => {
  const query = 'DELETE FROM books WHERE ISBN = $1';
  await pool.query(query, [ISBN]);
};








// Get user by username
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);

  if (result.rows.length === 0) {
      return null; // Return null if user not found
  }

  const { id, username: fetchedUsername, password } = result.rows[0];
  return new User(id, fetchedUsername, password);
}




module.exports = {
  searchBooks,
  addBook,
  removeBook,
  updateBook,
  getUserByUsername
};




