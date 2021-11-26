const async = require('async');
const Author = require('../models/author');
const Book = require('../models/book');

// display list of authors
exports.getAllAuthors = (req, res) => {
    
    // TODO: add number of publications to query
    Author.find({}, 'firstName lastName dateOfBirth dateOfDeath')
        .sort({ lastName: 'asc' })
        .exec((err, authors) => {
            if (err) {
                return next(err);
            }
            res.render('authors', { title: 'All Authors', authors: authors });
        })

};

// display author detail page
exports.getAuthorDetails = (req, res) => {

    async.parallel({
        author: (callback) => {
            Author.findById(req.params.id)
                .exec(callback);
        },
        books: (callback) => {
            Book.find({ author: req.params.id })
                .exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }

        res.render('authorDetails', {
            title: results.author.fullName,
            books: results.books,
        })

    });

}

// display create new author form
exports.getNewAuthorForm = (req, res) => {
    res.send('Create new author');
}

// handle create new author
exports.createNewAuthor = (req, res) => {
    res.send('Creating new author');
}

// handle delete author
exports.deleteAuthor = (req, res) => {
    res.send(`Delete author ${req.params.id}`);
}

// handle update author
exports. updateAuthor = (req, res) => {
    res.send(`Update author ${req.params.id}`);
}