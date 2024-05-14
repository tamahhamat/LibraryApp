const jwt = require('jsonwebtoken');

function generateToken(username) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}



// store token in local storage
function storeToken(token) {
    localStorage.setItem('token', token);
    console.log("token stored");
}

//  retrieve token from local storage
function getToken() {
    return localStorage.getItem('token');
}

// remove the token from local storage
function removeToken() {
    localStorage.removeItem('token');
    console.log("token removed");
}






module.exports = { generateToken, storeToken, getToken, removeToken };





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