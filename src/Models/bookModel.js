const pool = require('./database');

class Book {
    constructor(ISBN, title, author, genre) {
      this.ISBN = ISBN;
      this.title = title;
      this.author = author;
      this.genre = genre;
    }
  }
  
  module.exports = Book;