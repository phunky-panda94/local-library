const Book = require('../models/book');

// display list of all books
exports.getAllBooks = (req, res) => {
    res.send('List of all books');
}

// display book details
exports.getBookDetails = (req, res) => {
    res.send(`Book details for ${req.params.id}`);
}

// display create new book form
exports.getNewBookForm = (req, res) => {
    res.send('New book form');
}

// handle create new book
exports.createNewBook = (req, res) => {
    res.send('Creating new book');
}

// handle delete book 
exports.deleteBook = (req, res) => {
    res.send(`Deleting book ${req.params.id}`);
}

// handle update book
exports.updateBook = (req, res) => {
    res.send(`Updating book ${req.params.id}`);
}