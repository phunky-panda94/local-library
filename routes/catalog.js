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
router.get('/author/create', authorController.getNewAuthorForm);

// create new author
router.post('/author/create', authorController.createNewAuthor);

// get author details
router.get('/author/:id', authorController.getAuthorDetails);

// delete author
router.delete('/author/:id', authorController.deleteAuthor);

// update author
router.put('/author/:id', authorController.updateAuthor);

// get list of all authors
router.get('/authors', authorController.getAllAuthors);

/*** BOOK ROUTES ***/

// display create new book form
router.get('/book/create', bookController.getNewBookForm);

// create new book
router.post('/book/create', bookController.createNewBook);

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
router.get('/bookInstance/create', bookInstanceController.getNewBookInstanceForm);

 // create new book instance
router.post('/bookInstance/create', bookInstanceController.createNewBookInstance);

 // get book instance details
router.get('/bookInstance/:id', bookInstanceController.getBookInstanceDetails);

 // delete book instance
router.delete('/bookInstance/:id', bookInstanceController.deleteBookInstance);

 // update book instance
router.put('/bookInstance/:id', bookInstanceController.updateBookInstance);

// get list of all book instances
router.get('/bookInstances')

module.exports = router;