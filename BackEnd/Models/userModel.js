const pool = require('./database');

class User {
    constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password;
      // Add more fields as needed, such as email, role, etc.
    }
  }
  
  module.exports = User;