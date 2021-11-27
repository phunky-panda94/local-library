const express = require('express');
const router = express.Router();

// import controllers
const homeController = require('../controllers/homeController');
const authorController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');
const bookInstanceController = require('../controllers/bookInstanceController');

// catalog home page
router.get('/', homeController.index);

/***  AUTHOR ROUTES ***/

// display create new author form
router.get('/authors/create', authorController.getNewAuthorForm);

// create new author
router.post('/authors/create', authorController.createNewAuthor);

// delete author
router.post('/authors/:id/delete', authorController.deleteAuthor);

// update author
router.post('/authors/:id/update', authorController.updateAuthor);

// get author details
router.get('/authors/:id', authorController.getAuthorDetails);

// get list of all authors
router.get('/authors', authorController.getAllAuthors);

/*** BOOK ROUTES ***/

// display create new book form
router.get('/books/create', bookController.getNewBookForm);

// create new book
router.post('/books/create', bookController.createNewBook);

// delete book
router.post('/books/:id/delete', bookController.deleteBook);

// update book
router.post('/books/:id/update', bookController.updateBook);

// get book details
router.get('/books/:id', bookController.getBookDetails);

// get list of all books
router.get('/books', bookController.getAllBooks);

/*** BOOK INSTANCE ROUTES ***/

// display create new book instance form
router.get('/books/:bookId/bookInstances/create', bookInstanceController.getNewBookInstanceForm);

// create new book instance
router.post('/books/:bookId/bookInstances/create', bookInstanceController.createNewBookInstance);

// get book instance details
router.get('/books/:bookId/bookInstances/:instanceId', bookInstanceController.getBookInstanceDetails);

// delete book instance
router.post('/books/:bookId/bookInstances/:instanceId/delete', bookInstanceController.deleteBookInstance);

// update book instance
router.post('/books/:bookId/bookInstances/:instanceId/update', bookInstanceController.updateBookInstance);

/*** GENRE ROUTES ***/
router.get('/genres/:type/books', bookController.getGenreBooks);

router.get('/genres', bookController.getGenres);

module.exports = router;