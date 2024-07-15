# Book Library Catalog Web Application

## Application Architecture

### Overview
https://github.com/tamahhamat/LibraryApp

This project is a basic web application for a book library catalog. It uses a REST API backend and a simple frontend interface. The application supports two user roles: Readers and Librarians, each with distinct functionalities.

### Technologies Used
- **Backend:**
  - Node.js with Express.js for API development
  - PostgreSQL for data storage
  - JSON Web Tokens for authentication
- **Frontend:**
  - HTML5/CSS3 for UI
  - JavaScript with Fetch API for client-server communication
  - Alpine.js for frontend interactivity


## How to Run

### Prerequisites
- Node.js
- PostgreSQL
- Nodemon (optional)
- liveserver

### 

1. Clone the repository: https://github.com/tamahhamat/LibraryApp
2. Get access to my pgSQL databse somehow, probably if I allow external ip address in someway and give you these credentials:
- DB_USER=postgres
- DB_PASSWORD= redacted for security
- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=LibraryCatalog
3. run the backend sever using a command like 
- nodemon app.js
- node app.js
4. Run the front end server 
5. Open your web browser and navigate to http://localhost:800/.
6. goodluck. 

### File Structure
- **src/**
  - **Middleware/**
    - authMiddleware.js
  - **Models/**
    - bookModel.js
    - userModel.js
    - queries.js
  - **Routes/**
    - appRoutes.js
    - authRoutes.js
  - ap.js
  - database.js
  - utils.js

- **FrontEnd/**
  - **styles/**
    - homeStyle.css
    - librarianStyle.css
  - **views/**
    - home.html
    - librarian.html

- .env
- package-lock.json
- package.json



- **app.js**
  - **Description:** Entry point of the application, sets up Express server, middleware, and static file serving.
  - **Dependencies:** Express, CORS, dotenv, body-parser.
  - **Static File Handling:** Serves static files and styles from `FrontEnd` directory.
  - **Routes:** Mounts API routes (`appRoutes` and `authRoutes`) and middleware (`authenticateToken` from `authMiddleware.js`).

- **Routes/appRoutes.js**
  - **Description:** Defines routes related to book catalog and user interface.
  - **Endpoints:**
    - `/`: Serves the home page (`home.html`) for readers.
    - `/search`: Handles book search based on query parameters.
    - `/librarian`: Serves the librarian dashboard (`librarianPage.html`).
    - `/login`: Authenticates users based on username and password.

- **Routes/authRoutes.js**
  - **Description:** Defines routes that require authentication.
  - **Endpoints:**
    - `/addBook`: Adds a new book to the catalog.
    - `/updateBook`: Updates an existing book in the catalog.
    - `/removeBook`: Deletes a book from the catalog.

- **Middleware/authMiddleware.js**
  - **Description:** Middleware for handling JWT authentication.
  - **Functionality:** Verifies JWT tokens from request headers (`Authorization`), ensuring secure access to protected routes.

- **Models/queries.js**
  - **Description:** Contains database queries for interacting with books and users.
  - **Functions:**
    - `searchBooks(query)`: Searches books based on title, author, genre, or ISBN.
    - `getBookByISBN(ISBN)`: Retrieves a book by its ISBN.
    - `addBook(book)`: Inserts a new book into the database.
    - `updateBook(ISBN, updatedFields)`: Updates fields of a book identified by its ISBN.
    - `removeBook(ISBN)`: Deletes a book from the database.
    - `getUserByUsername(username)`: Retrieves a user from the database based on their username.

- **Backend/utils.js**
  - **Description:** Utility functions for token management and local storage operations.
  - **Functions:**
    - `generateToken(username)`: Generates a JWT token with the provided username using `jsonwebtoken`.
    - `storeToken(token)`: Stores a token in local storage using `node-localstorage`.
    - `getToken()`: Retrieves the stored token from local storage.
    - `removeToken()`: Removes the stored token from local storage.

- **database.js, .env**
  - **Description:** Auxiliary files for database connection (`database.js`) and environment variables (`dotenv`).


- **homestyle.css**
  - **Description:** Contains styles specific to the home page (`home.html`) of the web application. 

- **librarianStyle.css**
  - **Description:** Contains styles specific to the librarian dashboard (`librarian.html`) of the web application. T

- **home.html**
  - **Description:** This HTML file serves as the home page of the book library web application. It provides essential functionality for readers to access the catalog.

  ### Structure:
  - **Header:** Displays "Library Home Page" as the title of the page.
  - **Login Form:** Allows librarians to enter their username and password to authenticate. Upon successful login, librarians are redirected to the librarian dashboard (`/librarian`).
  - **Search Form:** Enables readers to search for books by entering keywords in the search input field and clicking the search button.
  - **Search Results:** A section (`searchResults`) dynamically populated with book information based on the search query results.
  - **Scripts:** Includes JavaScript code for enhanced interactivity:
    - **Login Form Submission:** Handles form submission (`loginForm`) using `fetch` API to send credentials (`username` and `password`) to (`http://localhost:800/login`).
    - **Search Form Submission:** Manages submission of (`searchForm`) for book search. It sends an a request to `http://localhost:800/search` with the entered search term (`searchInput`). Upon receiving data back, it updates the `searchResults` section with book details.
    - **Alpine.js Integration:** Uses Alpine.js (`x-data="{ search: '', results: [] }"`) for reactive data binding and managing search functionalities.


- **librarian.html**
  - **Description:** This HTML file serves as the dashboard for librarians. It provides functionality for managing the book catalog, including adding, updating, and removing books.

  ### Structure:
  - **Header:** Displays "Librarian Home Page" as the title of the page and includes a logout button (`logout-button`) for logging out by removing the JWT token from `localStorage`.
  - **Search Form:** Enables librarians to search for books by entering keywords in the search input field (`searchInput`).
  - **Add Book Button:** Toggles the visibility of the form (`addBookDiv`) for adding a new book to the catalog.
  - **Add Book Form:** A form within `addBookDiv` that allows librarians to input details (title, author, genre, ISBN) of a new book and save it to the database.
  - **Search Results Container (`searchResults`):** Dynamically displays search results or informs the librarian when no books match the search.
  - **Update View (`updateView`):** Displays a form for updating book details when the librarian clicks "Update Details" on a specific book.

  ### Script Functions:
  - **DOMContentLoaded Event Listener:** Initializes event listeners and fetches data when the DOM is fully loaded.
  - **Logout Button Event Listener:** Removes the JWT token from `localStorage` upon clicking the logout button (`logout-button`) and redirects the user to the home page (`/`).
  - **Add Book Form Submission:** Handles submission of the (`add-book-form`). Sends a POST request to `http://localhost:800/addBook` with the book details.
  - **Search Form Submission:** Handles submission of the (`searchForm`) for book search. Sends a request to `http://localhost:800/search` with the entered search term (`searchInput`) and updates the `searchResults` section with book details.
  - **Remove Book Button Event Listener:** Deletes a book from the database upon confirmation from the librarian.
  - **Update Book Button Event Listener:** Updates the UI to allow the librarian to modify book details (`updateView`). Handles  submission (`update-form`) for saving changes to a book's details and sends a PATCH request to `http://localhost:800/updateBook`.


- **utils/getPhotos.js**
  - **Description:** This file provides functionality to fetch and download cover photos of books based on their ISBNs using Axios for HTTP requests and Node.js's fs module for file system operations.

  ### Functions:
  - **fetchCoverUrl(isbn):**  retrieves the URL of the cover photo for a given ISBN from the Open Library API (`https://openlibrary.org/api/books`). It uses `axios.get` to fetch data in JSON format and extracts the URL from the response.
  
  - **downloadImage(url, filename):** Downloads an image from a specified URL (`url`) and saves it to the local file system with the given filename (`filename`). It uses `axios` with `responseType: 'stream'` to handle large image files and `fs.createWriteStream` to write the image data to a file.
  
  - **downloadCovers(isbns):** Iterates through a list of ISBNs (`isbns`), retrieves the cover photo URL for each ISBN using `fetchCoverUrl`, and downloads the image using `downloadImage`. It logs success messages when images are successfully downloaded and handles cases where no cover photo is found for an ISBN.
  
  ### Usage:
  - The script includes a predefined list of ISBNs (`isbns`) for books. When executed, it calls `downloadCovers(isbns)` to initiate the download process for each ISBN in the list.


## Successes

- Successfully implemented JWT-based authentication using `authMiddleware.js`.
- Utilized PostgreSQL for efficient data management with models defined in `Models/`.
- Implemented RESTful API endpoints for CRUD operations on books (`appRoutes.js`).

- Developed a semi- responsive UI with separate styles for different user roles (`styles/`).

- Good cover photo solution for books (sadly not fully used) 

## Challenges Encountered and Possible Improvements

- time managemant and personal conflicts
- unable to deploy to staging environment

- Implement more specific error handling (missing details, book already exists, etc).
- No function to create or delete librarian accounts.

- Enhance UI/UX design for a more enjoiable user experience, add photos.
- imploment a more responsive design.
- Better use of alpine.js

- Better project structure (seperating scripts from html)
