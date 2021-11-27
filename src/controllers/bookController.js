const async = require('async');
const Author = require('../models/author');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const { body, validationResult } = require('express-validator');

// display list of all books
exports.getAllBooks = (req, res) => {

    // TODO: add number of available copies to query

    Book.find({}, 'title author')
        .sort({ title: 'asc'})
        .populate('author')
        .exec((err, books) => {

            if (err) {
                return next(err)
            } 

            res.render('books', { title: 'All Books', books: books })

        })

}

// display book details
exports.getBookDetails = (req, res) => {

    async.parallel({
        book: (callback) => {
            Book.findById(req.params.id)
                .populate('author')
                .exec(callback);
        },
        bookInstances: (callback) => {
            BookInstance.find({ book: req.params.id })
                .exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }

        res.render('bookDetails', {
            title: results.book.title,
            book: results.book,
            bookInstances: results.bookInstances
        })

    });

}

// display create new book form
exports.getNewBookForm = (req, res) => {

    async.parallel({
        authors: (callback) => {
            Author.find({}, 'firstName lastName')
                .sort({ lastName: 'asc'})
                .exec(callback);
        },
        genres: (callback) => {
            Book.find()
                .distinct('genre')
                .exec(callback);
        }
    }, (err, results) => {
        if (err) return next(err);
        
        res.render('bookForm', {
            authors: results.authors,
            genres: results.genres
        });

    });
    
}

// handle create new book
exports.createNewBook = [

    // validate and sanitise input
    body('title').trim().isLength({ min: 3 }).escape().withMessage('Title must at least be 3 characters long'),
    body('author').isMongoId().withMessage('Author must be selected'),
    body('genre').trim().isLength({ min: 3 }).escape().withMessage('Genre must be provided'),
    body('isbn').trim().isISBN().escape().withMessage('A valid ISBN must be provided'),

    // process input
    (req, res, next) => {

        // return any errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // re-render form
            async.parallel({
                authors: (callback) => {
                    Author.find({}, 'firstName lastName')
                        .sort({ lastName: 'asc'})
                        .exec(callback);
                },
                genres: (callback) => {
                    Book.find()
                        .distinct('genre')
                        .exec(callback);
                }
            }, (err, results) => {
                if (err) return next(err);
                console.log(req.body.title);
                console.log(req.body.genre);
                console.log(req.body.summary);
                res.render('bookForm', {
                    title: req.body.title,
                    selectedAuthor: req.body.author,
                    authors: results.authors,
                    selectedGenre: req.body.genre,
                    genres: results.genres,
                    isbn: req.body.isbn,
                    summary: req.body.summary,
                    errors: errors.array()
                });
        
            });
                
        } else {
            // save new book
            let book = new Book({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                summary: req.body.summary,
                isbn: req.body.isbn,
            })

            book.save((err) => {
                if (err) return next(err);
                res.redirect(book.url);
            })

        }

    }

];

// handle delete book 
exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        res.redirect('/catalog/books');
    })
}

// TODO: handle update book
exports.updateBook = (req, res) => {
    res.send(`Updating book ${req.params.id}`);
}

// display available genres
exports.getGenres = (req, res) => {

    Book.find()
        .distinct('genre', (err, genres) => {

            if (err) {
                return next(err);
            }

            res.render('genres', { title: 'All genres', genres: genres });
        })

}

exports.getGenreBooks = (req, res) => {

    Book.find({ genre: `${req.params.type}` }, 'title author summary')
        .sort({ title: 'asc'})
        .populate('author')
        .exec((err, books) => {
            if (err) {
                return next(err);
            }
            res.render('genreBooks', { title: `${req.params.type} books`, books: books });
        })    
        
}