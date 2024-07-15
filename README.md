# Book Library Catalog Web Application

## Application Architecture

### Overview
This project implements a basic web application for a book library catalog, featuring a REST API backend and a simple frontend interface. The application supports two user roles: Readers and Librarians, each with distinct functionalities.

### Technologies Used
- **Backend:**
  - Node.js with Express.js for API development
  - PostgreSQL for data storage
  - JWT (JSON Web Tokens) for authentication
- **Frontend:**
  - Responsive HTML5/CSS3 for UI
  - JavaScript with Fetch API for client-server communication
  - Alpine.js for frontend interactivity

### File Structure
src/
|-- Middleware/
| |-- authMiddleware.js
|-- Models/
| |-- bookModel.js
| |-- userModel.js
| |-- queries.js
|-- Routes/
| |-- appRoutes.js
| |-- authRoutes.js
|-- ap.js
|-- database.js
|-- utils.js

FrontEnd/
|-- styles/
| |-- homeStyle.css
| |-- librarianStyle.css
|-- views/
| |-- home.html
| |-- librarian.html

.env
package-lock.json
package.json




## Successes

### Backend
- Successfully implemented JWT-based authentication using `authMiddleware.js`.
- Utilized PostgreSQL for efficient data management with models defined in `Models/`.
- Implemented RESTful API endpoints for CRUD operations on books (`appRoutes.js`).

### Frontend
- Developed a semi- responsive UI with separate styles for different user roles (`styles/`).
- Created views (`views/`) for both Readers and Librarians.

## Challenges Encountered

- **Frontend Interactivity:** Achieving smooth interactions using Alpine.js and ensuring compatibility across browsers.

## Possible Improvements

### Backend
- Implement more advanced error handling and validation in API endpoints.
- Introduce middleware for role-based access control (RBAC) to enhance security.

### Frontend
- Enhance UI/UX design for a more intuitive user experience.
- Implement pagination for browsing large collections of books.

### General
- Enhance documentation throughout the codebase for easier maintenance and onboarding of new developers.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Git (optional)

### Installation

1. Clone the repository:
