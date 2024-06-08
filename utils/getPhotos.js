// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

// // Function to download image
// const downloadImage = async (url, isbn) => {
//     try {
//         const response = await axios({
//             url,
//             responseType: 'stream',
//         });
//         const filename = path.join(__dirname, `${isbn}.jpg`);
//         const writer = fs.createWriteStream(filename);
//         response.data.pipe(writer);
//         return new Promise((resolve, reject) => {
//             writer.on('finish', resolve);
//             writer.on('error', reject);
//         });
//     } catch (error) {
//         console.error(`Error downloading image from ${url}:`, error.message);
//     }
// };

// // test use:
// const imageUrl = "https://covers.openlibrary.org/b/id/12373902-L.jpg";
// const isbn = "9780547928210"; // Example ISBN
// downloadImage(imageUrl, isbn)
//     .then(() => console.log(`Image downloaded successfully as ${isbn}.jpg`))
//     .catch(error => console.error("Error:", error));


const axios = require('axios');
const fs = require('fs');
const path = require('path');


// fetch cover photo URL for a given ISBN
const fetchCoverUrl = async (isbn) => {
    try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const data = response.data;
        return data[`ISBN:${isbn}`]?.cover?.large || null;
    } catch (error) {
        console.error(`Error fetching data for ISBN ${isbn}:`, error.message);
        return null;
    }
};

// download image
const downloadImage = async (url, filename) => {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });
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

// download cover photos ISBNs
const downloadCovers = async (isbns) => {
    for (const isbn of isbns) {
        const coverUrl = await fetchCoverUrl(isbn);
        if (coverUrl) {
            const filename = `${isbn}.jpg`;
            await downloadImage(coverUrl, filename);
            console.log(`Downloaded cover for ISBN ${isbn} as ${filename}`);
        } else {
            console.log(`Cover not found for ISBN ${isbn}`);
        }
    }
};

// List of ISBNs
const isbns = [
    '9780547928210', '9780547928203', '9780547928197', '9780547928227', '9780060935467',
    '9780451524935', '9780141439518', '9780743273565', '9780439708180', '9780316769488',
    '9780547928227', '9781451673319', '9780544003415', '9780141441146', '9780451526342',
    '9780066238500', '9781503280786', '9780140268867', '9780375842207', '9780142408766',
    '9780060850524', '9781451635621', '9780525478812', '9780062315007', '9780385333849',
    '9781594631931', '9781451626650', '9780143039433', '9780439023528', '9780307474278',
    '9780307387899', '9781594634024', '9780553593716', '9780425232200', '9780679781585',
    '9780307743657', '9780385490818', '9780156027328', '9780345391803', '9780141439600',
    '9780141439556', '9780060883288', '9780141439579', '9780064401884', '9780140449266',
    '9780060837020', '9780486411095', '9780486282114', '9780316044936', '9780156028356',
    '9780544336261', '9781400033416', '9780441172719', '9780140449136'
];

downloadCovers(isbns);
