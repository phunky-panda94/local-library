const express = require('express');
const router = express.Router();

// import controllers
const authorController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');
const bookInstanceController = require('../controllers/bookInstanceController');

// catalog home page
router.get('/', (req, res, next) => {
    res.send('Catalog home page');
})

/***  AUTHOR ROUTES ***/

// display create new author form
router.get('/authors/create', authorController.getNewAuthorForm);

// create new author
router.post('/authors/create', authorController.createNewAuthor);

// get author details
router.get('/authors/:id', authorController.getAuthorDetails);

// delete author
router.delete('/authors/:id', authorController.deleteAuthor);

// update author
router.put('/authors/:id', authorController.updateAuthor);

// get list of all authors
router.get('/authors', authorController.getAllAuthors);

/*** BOOK ROUTES ***/

// display create new book form
router.get('/books/create', bookController.getNewBookForm);

// create new book
router.post('/books/create', bookController.createNewBook);

// get book details
router.get('/books/:id', bookController.getBookDetails);

// delete book
router.delete('/books/:id', bookController.deleteBook);

// update book
router.put('/books/:id', bookController.updateBook);

// get list of all books
router.get('/books', bookController.getAllBooks);

/*** BOOK INSTANCE ROUTES ***/

 // display create new book instance form
router.get('/books/:id/bookInstances/create', bookInstanceController.getNewBookInstanceForm);

 // create new book instance
router.post('/books/:id/bookInstances/create', bookInstanceController.createNewBookInstance);

 // get book instance details
router.get('/books/:id/bookInstances/:id', bookInstanceController.getBookInstanceDetails);

 // delete book instance
router.delete('/books/:id/bookInstances/:id', bookInstanceController.deleteBookInstance);

 // update book instance
router.put('/books/:id/bookInstances/:id', bookInstanceController.updateBookInstance);

// get list of all book instances
router.get('/books/:id/bookInstances', bookInstanceController.getAllBookInstances);

module.exports = router;