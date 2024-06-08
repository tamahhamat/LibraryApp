const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to download image
const downloadImage = async (url, isbn) => {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });
        const filename = path.join(__dirname, `${isbn}.jpg`);
        const writer = fs.createWriteStream(filename);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image from ${url}:`, error.message);
    }
};

// test use:
const imageUrl = "https://covers.openlibrary.org/b/id/12373902-L.jpg";
const isbn = "9780547928210"; // Example ISBN
downloadImage(imageUrl, isbn)
    .then(() => console.log(`Image downloaded successfully as ${isbn}.jpg`))
    .catch(error => console.error("Error:", error));
