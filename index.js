const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Array to store books
let books = [];

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  // Generate unique ID for the book
  const id = Date.now().toString();

  // Create a new book object
  const book = {
    id,
    title,
    author,
    publishedDate
  };

  // Add the book to the collection
  books.push(book);

  // Send the response with the created book
  res.json(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  // Find the index of the book with the specified ID
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    // Remove the book from the collection
    const deletedBook = books.splice(index, 1)[0];

    // Send the response with the deleted book
    res.json({ message: 'Book successfully deleted', deletedBook });
  } else {
    // Send an error response if the book was not found
    res.status(404).json({ message: 'Book not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

