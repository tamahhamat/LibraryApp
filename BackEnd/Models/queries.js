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
  getUserByUsername
};




