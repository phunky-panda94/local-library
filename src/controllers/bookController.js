const async = require('async');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');

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