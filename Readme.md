# Library Management API

A RESTful API for managing books and borrowings in a library, built with **Express**, **TypeScript**, and **MongoDB** (via Mongoose).

---

## Features

- **Book Management**
  - Create, read, update, and delete books
  - Validation on fields such as genre, ISBN uniqueness, and copies count
  - Automatic availability status based on copies in stock
  - Filtering, sorting, and pagination support on book listings

- **Borrow Management**
  - Borrow books with quantity and due date
  - Business logic to verify availability before borrowing
  - Automatic deduction of book copies and availability updates
  - Aggregated summary of borrowed books with total quantities

- **Robust Error Handling**
  - Consistent response format with success status, messages, and error details
  - Handles validation errors and duplicate keys clearly

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose ODM

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mustazir/B5A3--Library-Management.git
cd B5A3--Library-Management
```
2. Install dependencies:
```
npm install
```
or
```
yarn install
```
3. Configure environment variables

Create a .env file in the root folder:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
4. Start the development server:
```
npm run dev
```
# or
```
yarn dev
```
The server should now be running at http://localhost:5000.


API Endpoints
Books
| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/api/books`     | Create a new book           |
| GET    | `/api/books`     | Get all books (filter/sort) |
| GET    | `/api/books/:id` | Get book by ID              |
| PUT    | `/api/books/:id` | Update book details         |
| DELETE | `/api/books/:id` | Delete a book               |

Borrow

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| POST   | `/api/borrow` | Borrow a book (with availability check) |
| GET    | `/api/borrow` | Get borrowed books summary              |


Response Format
All successful responses follow this format:

```
{
  "success": true,
  "message": "Descriptive message",
  "data": {}
}
```

Error responses include:
```
{
  "success": false,
  "message": "Error message",
  "error": {}
}

```
Project Structure
```
src/
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── models/
│   ├── books.model.ts
│   └── borrow.model.ts
├── interfaces/
│   ├── book.interface.ts
│   └── borrow.interface.ts
├── routes/
├── app.ts
└── server.ts
```

Important Notes
The API enforces that borrowing a book only succeeds if enough copies are available.

Book availability is updated automatically based on the number of copies.

Filtering books by genre and sorting results is supported via query parameters.

Live Deployment 
The API is deployed on [Live Link](https://billah-api.herokuapp.com/).
