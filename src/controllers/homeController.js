const Author = require('../models/author');
const Book = require('../models/book');

const async = require('async');

exports.index = (req, res) => {

    async.parallel({
        bookCount: (callback) => {
            Book.countDocuments({}, callback);
        },
        authorCount: (callback) => {
            Author.countDocuments({}, callback);
        }
    }, (err, results) => {
        res.render('index', { title: 'Home', error: err, data: results });
    });

}
