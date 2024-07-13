const pool = require('../database');
const User = require('./userModel');



async function searchBooks(query) {
  const searchQuery = `
    SELECT * 
    FROM books 
    WHERE title ILIKE $1 OR author ILIKE $1
  `;
  const { rows } = await pool.query(searchQuery, [`%${query}%`]);
  return rows;
};



const getBookByISBN = async (ISBN) => {
  const query = 'SELECT * FROM books WHERE ISBN = $1';
  const result = await pool.query(query, [ISBN]);
  return result.rows[0];
};



const addBook = async (book) => {
  const { ISBN, title, author, genre } = book;
  const query = 'INSERT INTO books (ISBN, title, author, genre) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [ISBN, title, author, genre]);
};


const removeBook = async (ISBN) => {
  const query = 'DELETE FROM books WHERE ISBN = $1';
  await pool.query(query, [ISBN]);
};


const updateBook = async (ISBN, updatedFields) => {
  const { title, author, genre } = updatedFields;

  // Build the query dynamically based on provided fields
  let query = 'UPDATE books SET ';
  const fields = [];
  const values = [];
  let index = 1;

  if (title) {
      fields.push(`title = $${index++}`);
      values.push(title);
  }
  if (author) {
      fields.push(`author = $${index++}`);
      values.push(author);
  }
  if (genre) {
      fields.push(`genre = $${index++}`);
      values.push(genre);
  }

  if (fields.length === 0) {
      throw new Error('No fields to update');
  }

  query += fields.join(', ') + ' WHERE ISBN = $' + index;
  values.push(ISBN);

  await pool.query(query, values);
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
  getBookByISBN,
  addBook,
  removeBook,
  updateBook,
  getUserByUsername
};




