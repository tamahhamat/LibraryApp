const pool = require('../database');

async function searchBooks(query) {
  const searchQuery = `
    SELECT * 
    FROM books 
    WHERE title ILIKE $1 OR author ILIKE $1
  `;
  const { rows } = await pool.query(searchQuery, [`%${query}%`]);
  return rows;
}

module.exports = {
  searchBooks
};