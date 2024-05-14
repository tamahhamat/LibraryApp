const express = require('express');
const router = express.Router();
//const db = require('../database.js');
//const bcrypt = require('bcrypt');
const path = require('path');

const { getUserByUsername } = require ('../Models/queries');
const { generateToken, storeToken } = require('../utils');



// get librarian page
router.get('/librarian', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'librarianPage.html'));
});



// login

router.post('/login', async (req, res) => {  
    console.log(req.body); 
    const { username, password } = req.body;

    try {
        console.log("Received login request for:", username);

        // Query the database to check if the username exists
        console.log("Searching for:", username);
        const user = await getUserByUsername(username);

        // If the username doesn't exist, return 401
        if (!user) {
            console.log("User not found:", username);
            return res.status(401).end();
        } 

        // Check if the password matches the db
        console.log("Checking password for:", username);

        if (user.password === password) {
            // Generate a JWT token with the username and send it back to the client
            console.log("Password matched. Creating JWT token for:", username);
            const token = generateToken(user.username);
            storeToken(token);
            res.json({ token });

        } else {
            // If the password is incorrect, return 401 Unauthorized
            console.log("Incorrect password for user:", username);
            res.status(401).end();
        }
        
    }
    catch (error) {
        // If an error occurs during the database query, return 500 Internal Server Error
        console.error('Error during login:', error);
        res.status(500).end();
    }
});


///////////////////////////////////////////////////////////////////////////////////



  module.exports = router;