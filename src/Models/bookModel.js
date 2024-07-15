const pool = require('./database');

class Book {
    constructor(ISBN, title, author, genre) {
      this.ISBN = ISBN;
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.cover_photo = cover_photo;
    }
  }
  
  module.exports = Book;