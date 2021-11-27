const async = require('async');
const Author = require('../models/author');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');

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

// TODO: display create new author form
exports.getNewAuthorForm = (req, res) => {
    res.render('authorForm', { title: 'Add new author' });
}

// handle create new author
exports.createNewAuthor = [

    // validate & sanitise input
    body('firstName').trim().isLength({ min: 2 }).escape().withMessage('First name must be provided'),
    body('lastName').trim().isLength({ min: 2 }).escape().withMessage('Last name must be provided'),
    body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // process input
    (req, res, next) => {

        // if errors, return form with error messages
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('authorForm', {
                title: 'Add new author',
                author: req.body,
                errors: errors.array()
            });
        }
        // else, create new Author object and save to database
        else {

            let author = new Author({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath
            })

            author.save((err) => {
                if (err) return next(err);
                res.redirect(author.url)
            });

        }

    }

];

// TODO: handle delete author
exports.deleteAuthor = (req, res) => {
    res.send(`Delete author ${req.params.id}`);
}

// TODO: handle update author
exports.updateAuthor = (req, res) => {
    res.send(`Update author ${req.params.id}`);
}