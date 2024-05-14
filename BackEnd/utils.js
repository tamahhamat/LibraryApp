const jwt = require('jsonwebtoken');

function generateToken(username) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { generateToken };



// // Generate a random string
// function generateRandomString(length) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }

// console.log(generateRandomString(32));